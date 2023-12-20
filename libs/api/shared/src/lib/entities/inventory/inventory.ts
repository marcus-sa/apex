import { Writable } from 'type-fest';
import {
  AutoIncrement,
  BackReference,
  integer,
  JSONEntity,
  PrimaryKey,
  Reference,
  cast,
  entity,
} from '@deepkit/type';

import { User } from '../user';
import { InventoryItem } from './inventory-item';

@entity.name('inventory')
export class Inventory {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly user: User & BackReference;
  readonly items: readonly InventoryItem[] & Reference = [];

  addItem(this: Writable<this>, item: InventoryItem): void {
    this.items = [...this.items, item];
  }

  static create(data: JSONEntity<Inventory>): Inventory {
    return cast<Inventory>(data);
  }
}
