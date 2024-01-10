import { rpc } from '@deepkit/rpc';

import { CreateUserData, UserControllerInterface } from '@apex/api/server';
import { User } from '@apex/api/shared';

import { AuthService } from '../auth';

@rpc.controller(UserControllerInterface)
export class UserController implements UserControllerInterface {
  constructor(private readonly auth: AuthService) {}

  async create(data: CreateUserData, token: string): Promise<User> {
    return await this.auth.createUser(data, token);
  }
}
