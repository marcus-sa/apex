import { Writable } from 'type-fest';
import {
  AutoIncrement,
  BackReference,
  integer,
  PrimaryKey,
  entity,
  Reference,
} from '@deepkit/type';

import { User, UserBadge } from '../user';
import { InventoryItem } from './inventory-item';

@entity.name('inventory')
export class Inventory {
  readonly id: integer & PrimaryKey & AutoIncrement = 0;
  readonly items: readonly InventoryItem[] & BackReference = [];
  readonly badges: readonly UserBadge[] & BackReference = [];

  constructor(readonly user: User & Reference) {}

  addItem(this: Writable<this>, item: InventoryItem): void {
    // eslint-disable-next-line functional/immutable-data
    this.items = [...this.items, item];
  }
}
