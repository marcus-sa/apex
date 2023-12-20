import { ControllerSymbol } from '@deepkit/rpc';
import { JSONEntity } from '@deepkit/type';

import { Room, InvalidRoomPasswordError } from '@zeus/api/shared';

export const RoomControllerInterface = ControllerSymbol('room', [
  Room,
  InvalidRoomPasswordError,
]);

export type CreateRoomArgs = Omit<JSONEntity<Room>, 'id' | 'users' | 'owner'>;

export interface RoomControllerInterface {
  /**
   * @returns Room
   * @throws InvalidRoomPasswordError
   */
  join(id: Room['id'], options: { readonly password?: string }): Promise<Room>;

  delete(id: Room['id']): Promise<Room>;

  create(data: CreateRoomArgs): Promise<Room>;
}

export const MessengerControllerInterface = ControllerSymbol('messenger');

export interface MessengerControllerInterface {}

export const InventoryControllerInterface = ControllerSymbol('inventory');

export interface InventoryControllerInterface {}

export const CatalogueControllerInterface = ControllerSymbol('catalogue');

export interface CatalogueControllerInterface {}
