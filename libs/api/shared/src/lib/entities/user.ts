import { Writable } from 'type-fest';
import {
  JSONEntity,
  AutoIncrement,
  cast,
  entity,
  integer,
  Positive,
  PrimaryKey,
  Reference,
  Unique,
} from '@deepkit/type';

import { Inventory } from './inventory';
import { Room } from './room';

@entity.name('user')
export class User {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly credits: integer & Positive = 0;
  readonly motto?: string;
  readonly inventory: Inventory & Reference;
  readonly rooms: readonly Room[] & Reference = [];
  readonly username: string & Unique;
  readonly look: string;
  // transient
  readonly activeRoom?: Room;

  setActiveRoom(this: Writable<this>, room: Room): void {
    this.activeRoom = room;
  }

  addRoom(this: Writable<this>, room: Room): void {
    this.rooms = [...this.rooms, room];
  }

  static create(data: JSONEntity<User>): User {
    return cast<User>(data);
  }
}
