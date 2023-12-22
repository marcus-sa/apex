import { RpcKernelBaseConnection } from '@deepkit/rpc';
import { cast } from '@deepkit/type';

import { GameControllerInterface, MessengerControllerInterface, RoomControllerInterface } from '@apex/api/client';

import { GameClient } from './game-client';
import { UserSession } from '../user';

export class GameManager {
  readonly clients = new Set<GameClient>();
  readonly connectionClients = new Map<RpcKernelBaseConnection, GameClient>();
  readonly userSessionClients = new Map<UserSession, GameClient>();

  // TODO: only create game clients for authenticated users
  addClient(connection: RpcKernelBaseConnection): void {
    const game = connection.controller<GameControllerInterface>(
      GameControllerInterface,
    );
    const room = connection.controller<RoomControllerInterface>(
      RoomControllerInterface,
    );
    const messenger = connection.controller<MessengerControllerInterface>(
      MessengerControllerInterface,
    );

    const gameClient = cast<GameClient>({
      controllers: {
        game,
        room,
        messenger,
      },
      connection,
    });

    const session = connection.sessionState.getSession()
    if (session instanceof UserSession) {
      this.userSessionClients.set(session, gameClient);
    }

    this.clients.add(gameClient);
    this.connectionClients.set(connection, gameClient);
  }

  getUserSessionClient(session: UserSession): GameClient | undefined {
    return this.userSessionClients.get(session);
  }

  getConnectionClient(connection: RpcKernelBaseConnection): GameClient | undefined {
    return this.connectionClients.get(connection);
  }
}
