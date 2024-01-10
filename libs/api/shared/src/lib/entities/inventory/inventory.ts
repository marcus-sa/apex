import { Writable } from 'type-fest';
import {
  AutoIncrement,
  BackReference,
  integer,
  PrimaryKey,
  entity,
  Reference,
} from '@deepkit/type';

import { User } from '../user';
import { InventoryItem } from './inventory-item';

@entity.name('inventory')
export class Inventory {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
  readonly items: readonly InventoryItem[] & BackReference = [];

  // TODO: Wait for https://github.com/deepkit/deepkit-framework/commit/2f689914f1ed0b6055289f1244a60cab0386c10e to land
  // constructor(readonly belongsTo: User & Reference) {}

  addItem(this: Writable<this>, item: InventoryItem): void {
    // eslint-disable-next-line functional/immutable-data
    this.items = [...this.items, item];
  }
}
