import { rpc } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { Room } from '../../entities';

@rpc.controller()
export class RoomController {
  constructor(private readonly database: Database) {}

  @rpc.action()
  async getInfo(id: Room['id']): Promise<Room> {
    return await this.database.query(Room).filter({ id }).findOne();
  }
}
