import { Coordinates } from '../../types';

import { User } from '../user';
import { Room } from './room';

// transient
export class RoomUser {
  readonly user: User;
  readonly room: Room;
  readonly coords: Coordinates;
  readonly walking: boolean = false;
}
