import type { Writable } from 'type-fest';
import type {
  JSONEntity,
  AutoIncrement,
  BackReference,
  integer,
  PrimaryKey,
  PositiveNoZero,
  Reference,
} from '@deepkit/type';
import { cast, entity } from '@deepkit/type';

import type { User } from '../user';
import type { RoomUser } from './room-user';
import type { RoomItem } from './room-item';

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
  readonly owner: User & Reference;
  readonly description?: string;
  readonly password?: string;
  readonly capacity: integer & PositiveNoZero = 1;
  readonly items: readonly RoomItem[] & BackReference = [];
  readonly type: RoomType = RoomType.OPEN;
  // transient
  readonly users: readonly RoomUser[] = [];

  addUser(this: Writable<this>, user: RoomUser): void {
    // eslint-disable-next-line functional/immutable-data
    this.users = [...this.users, user];
  }

  static create(data: JSONEntity<Room>): Room {
    return cast<Room>(data);
  }
}
