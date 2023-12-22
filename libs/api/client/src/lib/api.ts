import { ControllerSymbol } from '@deepkit/rpc';

import { Room, RoomChat, User } from '@apex/api/shared';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {}

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  RoomChat,
]);

export interface RoomControllerInterface {
  handleChatMessage(chat: RoomChat): Promise<void>;
  handleUserJoined(user: User): Promise<void>;
  handleUserLeft(user: User): Promise<void>;
  kickMe(reason?: string): Promise<void>;
  banMe(reason?: string): Promise<void>;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}
