import { createModule } from '@deepkit/app';
import { RpcKernelBaseConnection } from '@deepkit/rpc';

import { GameController } from './game.controller';
import { GameManager } from './game-manager';
import { GameClient } from './game-client';

export class GameModule extends createModule({
  controllers: [GameController],
  providers: [
    GameManager,
    {
      provide: GameClient,
      scope: 'rpc',
      useFactory(
        connection: RpcKernelBaseConnection,
        manager: GameManager,
      ): GameClient {
        return manager.getClientFromConnection(connection);
      },
    },
  ],
  exports: [GameManager, GameClient],
  forRoot: true,
}) {}
