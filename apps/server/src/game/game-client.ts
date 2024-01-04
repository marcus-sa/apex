import { RemoteController, RpcKernelBaseConnection } from '@deepkit/rpc';

import {
  GameControllerInterface,
  MessengerControllerInterface,
  RoomControllerInterface,
} from '@apex/api/client';

import { UserSession } from '../user';

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
