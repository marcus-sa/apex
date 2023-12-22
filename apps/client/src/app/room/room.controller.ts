import { rpc } from '@deepkit/rpc';

import { RoomControllerInterface } from '@apex/api/client';
import { RoomChat, User } from '@apex/api/shared';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  banMe(reason?: string): void {}

  handleChatMessage(chat: RoomChat): void {}

  handleUserJoined(user: User): void {}

  handleUserLeft(user: User): void {}

  kickMe(reason?: string): void {}
}
