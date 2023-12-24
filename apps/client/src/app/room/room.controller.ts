import { rpc } from '@deepkit/rpc';
import { inject } from '@angular/core';

import { RoomControllerInterface } from '@apex/api/client';
import { Room, RoomChat, User } from '@apex/api/shared';
import { ROOM } from './something';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  readonly room$ = inject(ROOM);

  banMe(reason?: string): void {}

  handleChatMessage(chat: RoomChat): void {}

  handleUserJoined(user: User): void {}

  handleUserLeft(user: User): void {}

  handleUpdates(room: Room) {}

  kickMe(reason?: string): void {}
}
