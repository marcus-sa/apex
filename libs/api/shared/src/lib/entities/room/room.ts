import { Writable } from 'type-fest';
import {
  JSONEntity,
  AutoIncrement,
  BackReference,
  cast,
  entity,
  integer,
  PrimaryKey,
  PositiveNoZero,
  Reference,
} from '@deepkit/type';

import { User } from '../user';
import { RoomUser } from './room-user';
import { RoomItem } from './room-item';

export enum RoomType {
  OPEN,
  FULL,
  LOCKED,
  PASSWORD_PROTECTED,
}

@entity.name('room')
export class Room {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly name: string;
  readonly owner: User & BackReference;
  readonly description?: string;
  readonly password?: string;
  readonly capacity: integer & PositiveNoZero = 1;
  readonly items: readonly RoomItem[] & Reference = [];
  readonly type: RoomType = RoomType.OPEN;
  // transient
  readonly users: readonly RoomUser[] = [];

  addUser(this: Writable<this>, user: RoomUser): void {
    this.users = [...this.users, user];
  }

  static create(data: JSONEntity<Room>): Room {
    return cast<Room>(data);
  }
}
