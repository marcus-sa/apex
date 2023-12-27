import { Writable } from 'type-fest';
import {
  AutoIncrement,
  BackReference,
  integer,
  JSONEntity,
  PrimaryKey,
  cast,
  entity, Reference,
} from '@deepkit/type';

import { User } from '../user';
import { InventoryItem } from './inventory-item';

@entity.name('inventory')
export class Inventory {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
  readonly items: readonly InventoryItem[] & BackReference = [];

  constructor(readonly belongsTo: User & Reference) {}

  addItem(this: Writable<this>, item: InventoryItem): void {
    // eslint-disable-next-line functional/immutable-data
    this.items = [...this.items, item];
  }
}
