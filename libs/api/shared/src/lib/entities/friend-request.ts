import {
  AutoIncrement,
  entity,
  integer,
  PrimaryKey,
  Reference,
} from '@deepkit/type';

import { User } from './user';

// TODO: if someone in the same room as you send yo ua friend request, it should appear above the users head in the room
@entity.name('friend-request')
export class FriendRequest {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;

  constructor(
    readonly from: User & Reference,
    readonly to: User & Reference,
  ) {}
}
