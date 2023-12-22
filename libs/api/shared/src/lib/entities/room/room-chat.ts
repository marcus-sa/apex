import { entity } from '@deepkit/type';

import { User } from '../user';
import { Room } from './room';
import { Vector3D } from '../../types';

// transient
@entity.name('room-chat')
export class RoomChat {
  readonly sender: User;
  readonly room: Room;
  readonly content: string;
  readonly position: Vector3D;
  readonly sentAt: Date = new Date();
}
