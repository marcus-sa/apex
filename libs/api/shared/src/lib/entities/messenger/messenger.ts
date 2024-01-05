import {
  AutoIncrement,
  BackReference,
  entity,
  integer,
  PrimaryKey,
} from '@deepkit/type';

import { FriendRequest } from '../friend-request';

@entity.name('messenger')
export class Messenger {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
  readonly incomingFriendRequests: readonly FriendRequest[] &
    BackReference<{ readonly mappedBy: 'to' }> = [];
  readonly outgoingFriendRequests: readonly FriendRequest[] &
    BackReference<{ readonly mappedBy: 'from' }> = [];
}
