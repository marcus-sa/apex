import { Writable } from 'type-fest';
import { cast, entity } from '@deepkit/type';
import {
  AutoIncrement,
  integer,
  Positive,
  PrimaryKey,
  Unique,
  BackReference,
  DatabaseField,
} from '@deepkit/type';

import { Inventory } from './inventory';
import { Room } from './room';
import { Friend } from './friend';
import { FriendRequest } from './friend-request';

@entity.name('user')
export class User {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
  readonly credits: integer & Positive = 0;
  readonly motto?: string;
  readonly inventory: Inventory & BackReference = new Inventory();
  readonly rooms: readonly Room[] & BackReference = [];
  readonly username: string & Unique;
  readonly look: string;
  readonly online: boolean = false;
  readonly friends: readonly Friend[] &
    BackReference<{ readonly via: typeof Friend }> = [];
  // readonly friends: readonly User[] & BackReference;
  // transient
  readonly activeRoom?: Room & DatabaseField<{ readonly skip: true }>;

  setActiveRoom(this: Writable<this>, room: Room | undefined): void {
    // eslint-disable-next-line functional/immutable-data
    this.activeRoom = room;
  }

  addRoom(this: Writable<this>, room: Room): void {
    // eslint-disable-next-line functional/immutable-data
    this.rooms = [...this.rooms, room];
  }

  setOnline(this: Writable<this>, value: boolean): void {
    // eslint-disable-next-line functional/immutable-data
    this.online = value;
  }

  static create({ username, look }: Pick<User, 'username' | 'look'>): User {
    return cast<User>({ username, look });
  }
}
