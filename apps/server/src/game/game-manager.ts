import { RpcKernelBaseConnection } from '@deepkit/rpc';
import { cast } from '@deepkit/type';

import {
  GameControllerInterface,
  MessengerControllerInterface,
  RoomControllerInterface,
} from '@apex/api/client';

import { GameClient } from './game-client';
import { UserSession } from '../user';

export class GameManager {
  readonly clients = new Set<GameClient>();
  readonly connectionClients = new Map<RpcKernelBaseConnection, GameClient>();
  readonly userSessionClients = new Map<UserSession, GameClient>();

  addClient(connection: RpcKernelBaseConnection, session: UserSession): void {
    const game = connection.controller<GameControllerInterface>(
      GameControllerInterface,
    );
    const room = connection.controller<RoomControllerInterface>(
      RoomControllerInterface,
    );
    const messenger = connection.controller<MessengerControllerInterface>(
      MessengerControllerInterface,
    );

    const gameClient = new GameClient(connection, session, {
      game,
      room,
      messenger,
    });

    this.clients.add(gameClient);
    this.userSessionClients.set(session, gameClient);
    this.connectionClients.set(connection, gameClient);
  }

  getUserSessionClient(session: UserSession): GameClient | undefined {
    return this.userSessionClients.get(session);
  }

  getConnectionClient(
    connection: RpcKernelBaseConnection,
  ): GameClient | undefined {
    return this.connectionClients.get(connection);
  }
}
