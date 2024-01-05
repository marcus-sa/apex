import {
  AuthenticationError,
  RpcKernelBaseConnection,
  RpcKernelSecurity,
} from '@deepkit/rpc';

import { AuthService } from '../auth';
import { UserSession } from '../user';
import { GameManager } from '../game';

export class ApexRpcKernelSecurity extends RpcKernelSecurity {
  constructor(
    private readonly auth: AuthService,
    private readonly game: GameManager,
    private readonly connection: RpcKernelBaseConnection,
  ) {
    super();
  }

  override async authenticate(token: string): Promise<UserSession> {
    try {
      const user = await this.auth.authenticate(token);
      const session = new UserSession(user, token);
      await this.game.connect(this.connection, session);
      return session;
    } catch (err: unknown) {
      throw new AuthenticationError((err as Error).message);
    }
  }
}
