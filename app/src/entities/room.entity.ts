import { AutoIncrement, entity, integer, Positive, PositiveNoZero, PrimaryKey, Reference } from '@deepkit/type';

import { User } from './user.entity';

export enum RoomState {
  OPEN,
  LOCKED,
  PASSWORD,
  FULL,
}

export class Coordinates {
  readonly x: integer;
  readonly y: integer;
  readonly z: integer;
}

export class RoomFloor {
  readonly thickness: integer & PositiveNoZero = 1;
  readonly tiles: Coordinates[];
}

@entity.name('room')
export class Room {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;

  constructor(readonly name: string, readonly owner: User & Reference, readonly state: RoomState, readonly password: string | undefined, readonly floor: RoomFloor) {}

  static create({ name, owner, state, password, floor }: Omit<Room, 'id'>): Room {
    return new Room(name, owner, state ?? (password ? RoomState.PASSWORD : undefined), password, floor);
  }
}
