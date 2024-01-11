import { Injectable } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { RoomControllerInterface } from '@apex/api/server';
import { Room, User } from '@apex/api/shared';

import { RoomController } from './room.controller';

@Injectable()
export class RoomService {
  readonly server = this.rpc.controller<RoomControllerInterface>(
    RoomControllerInterface,
  );

  constructor(
    private readonly rpc: RpcClient,
    readonly client: RoomController,
  ) {}

  isOwner(user: User, room: Room): boolean {
    return user.id === room.owner.id;
  }
}
