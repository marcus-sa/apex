import {
  AutoIncrement,
  BackReference,
  entity,
  integer,
  PrimaryKey,
  Reference,
} from '@deepkit/type';

import { BaseItem } from '../base-item';
import { Room } from './room';

@entity.name('room-item')
export class RoomItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly room: Room & BackReference;
  readonly base: BaseItem & Reference;
}
