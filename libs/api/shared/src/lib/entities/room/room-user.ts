import { entity } from '@deepkit/type';

import { Vector3D } from '../../types';
import { User } from '../user';
import { Room } from './room';

// transient
@entity.name('room-user')
export class RoomUser {
  readonly user: User;
  readonly room: Room;
  readonly position: Vector3D;
  readonly walking: boolean = false;
}
