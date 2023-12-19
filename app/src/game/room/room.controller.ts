import { rpc, SessionState } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { Room } from '../../entities';

@rpc.controller()
export class RoomController {
  constructor(
    // private readonly database: Database,
    private readonly state: SessionState) {}

  @rpc.action()
  async getInfo(id: Room['id']): Promise<Room> {
    // @ts-ignore
    return new Room();
    // return await this.database.query(Room).filter({ id }).findOne();
  }

  @rpc.action()
  askPermissionToEnterLocked() {

  }

  @rpc.action()
  verifyPassword() {

  }

  @rpc.action()
  enter() {

  }
}
