import { rpc } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { CreateRoomArgs, RoomControllerInterface } from '@apex/api/server';
import { Room } from '@apex/api/shared';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  constructor(private readonly database: Database) {}

  async join(id: Room['id']): Promise<Room> {}

  delete(id: Room['id']): Promise<Room> {}

  create(data: CreateRoomArgs): Promise<Room> {}
}
