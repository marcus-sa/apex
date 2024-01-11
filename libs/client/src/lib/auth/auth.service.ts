import { RpcClient } from '@deepkit/rpc';
import { deserialize, serialize } from '@deepkit/type';
import { inject, signal } from '@angular/core';

import { User } from '@apex/api/shared';
import { AuthControllerInterface } from '@apex/api/server';

import { AuthConfig, OAuthProvider } from './config';

const TOKEN_STORAGE_KEY = 'apex:auth:token';

const USER_STORAGE_KEY = 'apex:auth:user';

export abstract class AuthService {
  private readonly rpc = inject(RpcClient);
  private readonly config = inject(AuthConfig);

  protected token?: string;
  protected user?: User;

  public error = signal<Error | null>(null);

  readonly server = this.rpc.controller<AuthControllerInterface>(
    AuthControllerInterface,
  );

  private unsetToken(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    // eslint-disable-next-line functional/immutable-data
    delete this.token;
  }

  private unsetUser(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
    // eslint-disable-next-line functional/immutable-data
    delete this.user;
  }

  protected setToken(value: string): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, value);
    this.token = value;
  }

  protected setUser(value: User): void {
    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(serialize<User>(value)),
    );
    this.user = value;
  }

  async initialize(): Promise<void> {}

  isAuthenticated(): boolean {
    return !!(this.getToken() && this.getUser());
  }

  getToken(): string | null {
    if (this.token) return this.token;
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) return null;
    this.token = storedToken;
    return this.token;
  }

  getUser(): User | null {
    if (this.user) return this.user;
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (!storedUser) return null;
    const user = deserialize<User>(JSON.parse(storedUser));
    this.user = user;
    return this.user;
  }

  async authenticate(token: string): Promise<User> {
    await this.rpc.disconnect();
    this.rpc.token.set(token);
    await this.rpc.connect();
    const user = await this.server.getUser();
    this.setToken(token);
    this.setUser(user);
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async signOut(): Promise<void> {
    this.unsetUser();
    this.unsetToken();
  }

  async signUp(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async signInWithOAuth(provider: OAuthProvider): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async signInWithPassword(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async signInWithOtp(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async verifyOtp(): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
