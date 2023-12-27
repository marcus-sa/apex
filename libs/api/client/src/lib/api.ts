import { ControllerSymbol } from '@deepkit/rpc';

import { Room, RoomChat, User } from '@apex/api/shared';

import { GameEvent, MessengerEvent, RoomChatEvent, RoomEvent } from './events';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {
  handleEvent(event: GameEvent): void;
}

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  RoomChat,
  RoomChatEvent,
]);

export interface RoomControllerInterface {
  handleEvent(event: RoomEvent): void;
  handleChatMessage(chat: RoomChat): void;
  handleUserJoined(user: User): void;
  handleUserLeft(user: User): void;
  handleUpdates(room: Room): void;
  kickMe(reason?: string): void;
  banMe(reason?: string): void;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {
  handleEvent(event: MessengerEvent): void;
}
