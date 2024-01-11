import { rpc } from '@deepkit/rpc';
import { InjectorContext } from '@deepkit/injector';

import { User } from '@apex/api/shared';
import { AuthControllerInterface } from '@apex/api/server';

@rpc.controller(AuthControllerInterface)
export class AuthController implements AuthControllerInterface {
  constructor(private readonly injector: InjectorContext) {}

  async getUser(): Promise<User> {
    return this.injector.get(User);
  }
}
