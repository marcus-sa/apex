import { Writable } from 'type-fest';
import {
  AutoIncrement,
  BackReference,
  integer,
  JSONEntity,
  PrimaryKey,
  Reference,
} from '@deepkit/type';
import { cast, entity } from '@deepkit/type';

import { User } from '../user';
import { InventoryItem } from './inventory-item';

@entity.name('inventory')
export class Inventory {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly user: User & Reference;
  readonly items: readonly InventoryItem[] & BackReference = [];

  addItem(this: Writable<this>, item: InventoryItem): void {
    // eslint-disable-next-line functional/immutable-data
    this.items = [...this.items, item];
  }

  static create(data: JSONEntity<Inventory>): Inventory {
    return cast<Inventory>(data);
  }
}
