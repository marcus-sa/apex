import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

import { AuthService, OAuthProvider } from '@apex/client';

@Injectable()
export class SupabaseAuthService extends AuthService {
  constructor(private readonly client: SupabaseClient) {
    super();
  }

  override async initialize(): Promise<void> {
    if (this.isAuthenticated()) return;

    {
      const { error } = await this.client.auth.initialize();
      if (error) {
        this.error.set(error);
        return;
      }
    }

    {
      const { data, error } = await this.client.auth.getSession();
      if (error) {
        this.error.set(error);
        return;
      }
      if (!data.session) {
        this.error.set(new Error('Missing session'));
        return;
      }

      await this.authenticate(data.session.access_token);
    }
  }

  override async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) {
      this.error.set(error);
    }
    await super.signOut();
  }

  override async signInWithOAuth(provider: OAuthProvider): Promise<void> {
    const { error } = await this.client.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      this.error.set(error);
    }
  }
}
