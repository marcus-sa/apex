import { RemoteController, RpcKernelBaseConnection } from '@deepkit/rpc';

import { UserSession } from '@apex/server';
import {
  GameControllerInterface,
  MessengerControllerInterface,
  RoomControllerInterface,
} from '@apex/api/client';

export interface GameClientControllers {
  readonly game: RemoteController<GameControllerInterface>;
  readonly room: RemoteController<RoomControllerInterface>;
  readonly messenger: RemoteController<MessengerControllerInterface>;
}

export class GameClient {
  constructor(
    readonly connection: RpcKernelBaseConnection,
    readonly session: UserSession,
    readonly controllers: GameClientControllers,
  ) {}
}
