import { ControllerSymbol } from '@deepkit/rpc';

import { Room, RoomChatMessage, User } from '@apex/api/shared';

import { GameEvent, MessengerEvent, ROOM_EVENTS, RoomEvent } from './events';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {
  handleEvent(event: GameEvent): void;
}

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  RoomChatMessage,
  ...ROOM_EVENTS,
]);

export interface RoomControllerInterface {
  handleEvent(event: RoomEvent): void;
  handleChatMessage(chat: RoomChatMessage): void;
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
