import { Injectable } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { UserControllerInterface } from '@apex/api/server';
import { User } from '@apex/api/shared';
import { AuthService } from '@apex/client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly server = this.rpc.controller<UserControllerInterface>(
    UserControllerInterface,
  );

  readonly cached = new Set<User>();

  constructor(
    private readonly rpc: RpcClient,
    private readonly auth: AuthService,
  ) {}

  get me(): User {
    const user = this.auth.getUser();
    if (!user) {
      throw new Error('No user');
    }
    return user;
  }
}
