import { entity } from '@deepkit/type';

import { Room } from './room';
import { RoomItem } from './room-item';
import { RoomUser } from './room-user';

@entity.name('room-map')
export class RoomMap {
  readonly room: Room;
  // transient
  readonly coordinatedItems: readonly RoomItem[];
  // transient
  readonly coordinatedUsers: readonly RoomUser[];
}
