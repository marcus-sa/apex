import { ControllerSymbol } from '@deepkit/rpc';

import { Room, RoomChat, User } from '@apex/api/shared';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {}

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  RoomChat,
]);

export interface RoomControllerInterface {
  handleChatMessage(chat: RoomChat): void;
  handleUserJoined(user: User): void;
  handleUserLeft(user: User): void;
  kickMe(reason?: string): void;
  banMe(reason?: string): void;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}
