import { RpcInjectorContext } from '@deepkit/framework';
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
  ) {
    super();
  }

  // TODO: Wait for https://github.com/deepkit/deepkit-framework/pull/536 to land
  override async authenticate(token: string, connection: RpcKernelBaseConnection): Promise<UserSession> {
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
