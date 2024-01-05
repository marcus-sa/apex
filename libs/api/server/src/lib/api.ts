import { ControllerSymbol } from '@deepkit/rpc';
import { JSONEntity } from '@deepkit/type';

import { Room, InvalidRoomPasswordError, User } from '@apex/api/shared';

export const UserControllerInterface = ControllerSymbol('user', [User]);

export type CreateUserData = Pick<User, 'username' | 'look'>;

export interface UserControllerInterface {
  create(data: CreateUserData, token: string): Promise<User>;
}

export const GameControllerInterface = ControllerSymbol('game', [User]);

export interface GameControllerInterface {
  getOnlineUsers(): Promise<readonly User[]>;
}

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  InvalidRoomPasswordError,
]);

export type CreateRoomArgs = Omit<JSONEntity<Room>, 'id' | 'users' | 'owner'>;

export type JoinRoomOptions = { readonly password: string };

export interface RoomControllerInterface {
  get(id: Room['id']): Promise<Room>;
  /**
   * @returns Room
   * @throws InvalidRoomPasswordError
   */
  join(id: Room['id'], options?: JoinRoomOptions): Promise<Room>;

  delete(id: Room['id']): Promise<Room>;

  create(data: CreateRoomArgs): Promise<Room>;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}

export const InventoryControllerInterface = ControllerSymbol('inventory');

export interface InventoryControllerInterface {}

export const CatalogueControllerInterface = ControllerSymbol('catalogue');

export interface CatalogueControllerInterface {}
