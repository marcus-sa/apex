import { RemoteController, RpcKernelBaseConnection } from '@deepkit/rpc';
import { WebSocket } from 'uWebSockets.js';

import { User } from '@apex/api/shared';
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
  readonly connection: RpcKernelBaseConnection;
  readonly ws: WebSocket<undefined>;
  readonly controllers: GameClientControllers;
  readonly user?: User;
}
