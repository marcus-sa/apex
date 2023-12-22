import { ControllerSymbol } from '@deepkit/rpc';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {
  sendChat(): string;
}

export const RoomControllerInterface = ControllerSymbol('game/room');

export interface RoomControllerInterface {}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}
