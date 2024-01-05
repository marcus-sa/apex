import { RpcKernelBaseConnection } from '@deepkit/rpc';

import { User } from '@apex/api/shared';
import {
  GameControllerInterface,
  MessengerControllerInterface,
  RoomControllerInterface,
} from '@apex/api/client';

import { GameClient } from './game-client';
import { UserRepository, UserSession } from '../user';

export class GameManager {
  private readonly userClients = new Map<User['id'], GameClient>();
  private readonly connectionClients = new Map<
    RpcKernelBaseConnection,
    GameClient
  >();
  private readonly connectionSessions = new Map<
    RpcKernelBaseConnection,
    UserSession
  >();
  readonly clients = new Set<GameClient>();

  constructor(private readonly user: UserRepository) {}

  async connect(
    connection: RpcKernelBaseConnection,
    session: UserSession,
  ): Promise<void> {
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
    this.userClients.set(session.user.id, gameClient);
    this.connectionClients.set(connection, gameClient);
    this.connectionSessions.set(connection, session);

    await this.user.setOnline(session.user);
  }

  getUserClient(user: User): GameClient | undefined {
    return this.userClients.get(user.id);
  }

  getConnectionClient(
    connection: RpcKernelBaseConnection,
  ): GameClient | undefined {
    return this.connectionClients.get(connection);
  }

  async disconnect(connection: RpcKernelBaseConnection): Promise<void> {
    const client = this.connectionClients.get(connection);
    if (!client) {
      return;
      // throw new Error('No connection client');
    }
    this.connectionClients.delete(connection);

    const session = this.connectionSessions.get(connection);
    if (!session) {
      return;
      // throw new Error('No connection session');
    }
    this.connectionSessions.delete(connection);
    this.userClients.delete(session.user.id);

    this.clients.delete(client);

    await this.user.setOffline(session.user);
  }
}
