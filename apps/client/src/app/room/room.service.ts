import { Injectable } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { JoinRoomOptions, RoomControllerInterface } from '@apex/api/server';
import { Room, User } from '@apex/api/shared';

@Injectable()
export class RoomService {
  private readonly server = this.client.controller<RoomControllerInterface>(
    RoomControllerInterface,
  );

  constructor(
    private readonly client: RpcClient,
  ) {}

  isOwner(user: User, room: Room): boolean {
    return user.id === room.owner.id;
  }

  async get(id: Room['id']): Promise<Room> {
    return await this.server.get(id);
  }

  async join(id: Room['id'], options?: JoinRoomOptions): Promise<Room> {
    return await this.server.join(id, options);
  }
}
