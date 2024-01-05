import { cast, entity } from '@deepkit/type';
import { Writable } from 'type-fest';
import { Subject } from 'rxjs';
import {
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
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
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

  setOwner(this: Writable<this>, owner: User): void {
    // eslint-disable-next-line functional/immutable-data
    this.owner = owner;
  }

  static create({ name, owner, map }: Pick<Room, 'name' | 'owner' | 'map'>) {
    return cast<User>({
      name,
      owner,
      map,
    });
  }
}
