import { rpc } from '@deepkit/rpc';

import { CreateRoomArgs } from '@apex/api/server';
import { RoomControllerInterface } from '@apex/api/server';
import { Room } from '@apex/api/shared';

import { UserSession } from '../user';
import { RoomManager } from './room-manager';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  constructor(
    private readonly session: UserSession,
    private readonly roomManager: RoomManager,
  ) {}

  @rpc.action()
  async join(
    id: Room['id'],
    options: { readonly password?: string },
  ): Promise<Room> {
    return await this.roomManager.join(id, this.session.user);
  }

  @rpc.action()
  async create(data: CreateRoomArgs): Promise<Room> {
    return await this.roomManager.create(this.session.user, data);
  }

  @rpc.action()
  async delete(id: Room['id']): Promise<Room> {
    return await this.roomManager.delete(id, this.session.user);
  }
}
