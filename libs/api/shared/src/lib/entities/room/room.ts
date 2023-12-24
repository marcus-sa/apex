import { cast, entity } from '@deepkit/type';
import { Writable } from 'type-fest';
import { Subject } from 'rxjs';
import {
  JSONEntity,
  AutoIncrement,
  BackReference,
  integer,
  PrimaryKey,
  PositiveNoZero,
  Reference,
  DatabaseField,
} from '@deepkit/type';

import { User } from '../user';
import { RoomUser } from './room-user';
import { RoomItem } from './room-item';
import { RoomChat } from './room-chat';

export enum RoomState {
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
  readonly map: string;
  readonly capacity: integer & PositiveNoZero = 1;
  readonly items: readonly RoomItem[] & BackReference = [];
  readonly state: RoomState = RoomState.OPEN;
  // transient
  readonly users: readonly RoomUser[] & DatabaseField<{ readonly skip: true }> =
    [];
  readonly chats: Subject<RoomChat> & DatabaseField<{ readonly skip: true }> =
    new Subject<RoomChat>();

  addUser(this: Writable<this>, user: RoomUser): void {
    // eslint-disable-next-line functional/immutable-data
    this.users = [...this.users, user];
  }

  static create(data: JSONEntity<Room>): Room {
    return cast<Room>(data);
  }
}
