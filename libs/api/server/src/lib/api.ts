import { ControllerSymbol } from '@deepkit/rpc';

import { Room, InvalidRoomPasswordError, User } from '@apex/api/shared';

export const AuthControllerInterface = ControllerSymbol('auth', [User]);

export interface AuthControllerInterface {
  // createUser(data: CreateUserData, token: string): Promise<User>;
  getUser(): Promise<User>;
}

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

export type CreateRoomArgs = Omit<
  Room,
  'id' | 'users' | 'owner' | 'map' | 'name'
>;

export type JoinRoomOptions = { readonly password: string };

export interface RoomControllerInterface {
  get(id: Room['id']): Promise<Room>;
  /**
   * @returns Room
   * @throws InvalidRoomPasswordError
   */
  join(id: Room['id'], options?: JoinRoomOptions): Promise<Room>;

  leave(): Promise<void>;

  sendChatMessage(content: string): Promise<void>;

  delete(id: Room['id']): Promise<Room>;

  create(data: CreateRoomArgs): Promise<Room>;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}

export const InventoryControllerInterface = ControllerSymbol('inventory');

export interface InventoryControllerInterface {}

export const CatalogueControllerInterface = ControllerSymbol('catalogue');

export interface CatalogueControllerInterface {}
