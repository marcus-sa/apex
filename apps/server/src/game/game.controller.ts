import { rpc } from '@deepkit/rpc';

import { GameControllerInterface } from '@apex/api/server';
import { User } from '@apex/api/shared';

import { GameManager } from './game-manager';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {
  constructor(private readonly game: GameManager) {}

  async getOnlineUsers(): Promise<readonly User[]> {
    return [...this.game.clients].map(client => client.session.user);
  }
}
