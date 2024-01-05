import {
  AutoIncrement,
  integer,
  PrimaryKey,
  Reference,
  entity,
} from '@deepkit/type';

import { User } from './user';

@entity.name('friend')
export class Friend {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;

  constructor(
    readonly user1: User & Reference,
    readonly user2: User & Reference,
  ) {}
}
