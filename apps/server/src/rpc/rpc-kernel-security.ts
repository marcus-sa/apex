import {
  AuthenticationError,
  RpcKernelBaseConnection,
  RpcKernelSecurity,
} from '@deepkit/rpc';

import { AuthService, UserSession } from '@apex/server';

import { GameManager } from '../game';

export class ApexRpcKernelSecurity extends RpcKernelSecurity {
  constructor(
    private readonly auth: AuthService,
    private readonly game: GameManager,
  ) {
    super();
  }

  override async authenticate(
    token: string,
    connection: RpcKernelBaseConnection,
  ): Promise<UserSession> {
    try {
      const user = await this.auth.authenticate(token);
      const session = new UserSession(user, token);
      await this.game.connect(connection, session);
      return session;
    } catch (err: unknown) {
      throw new AuthenticationError((err as Error).message);
    }
  }
}
