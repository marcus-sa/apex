import { ControllerSymbol } from '@deepkit/rpc';

export const GameControllerInterface = ControllerSymbol('game');

export interface GameControllerInterface {}

export const RoomControllerInterface = ControllerSymbol('game/room');

export interface RoomControllerInterface {}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}
