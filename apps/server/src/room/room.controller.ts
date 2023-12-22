import { rpc } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { CreateRoomArgs } from '@apex/api/server';
import { RoomControllerInterface } from '@apex/api/server';
import { Room } from '@apex/api/shared';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  constructor(private readonly database: Database) {}

  // @ts-expect-error not implemented
  async join(id: Room['id']): Promise<Room> {}

  // @ts-expect-error not implemented
  async delete(id: Room['id']): Promise<Room> {}

  // @ts-expect-error not implemented
  async create(data: CreateRoomArgs): Promise<Room> {}
}
