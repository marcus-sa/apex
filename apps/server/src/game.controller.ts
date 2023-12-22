import { rpc } from '@deepkit/rpc';

import { GameControllerInterface } from '@apex/api/server';
import { User } from '@apex/api/shared';

import { ApexRpcServer } from './rpc';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {
  constructor(private readonly server: ApexRpcServer) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async getOnlineUsers(): Promise<readonly User[]> {
    return [...this.server.gameClients]
      .map(client => client.user)
      .filter((user): user is User => !!user);
  }
}
