import { float, integer } from '@deepkit/type';

import { User } from '../../user';
import { Room } from '../room';

export interface Coordinates {
  readonly x: integer;
  readonly y: integer;
  readonly z: float;
}

export class RoomUser {
  readonly user: User;
  readonly room: Room;
  readonly coords: Coordinates;
  readonly walking: boolean = false;
}
