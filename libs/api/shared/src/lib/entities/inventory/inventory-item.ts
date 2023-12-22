import {
  AutoIncrement,
  integer,
  JSONEntity,
  PrimaryKey,
  Reference,
} from '@deepkit/type';
import { BackReference, cast, entity } from '@deepkit/type';

import { BaseItem } from '../base-item';
import { Inventory } from './inventory';

@entity.name('inventory-item')
export class InventoryItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly inventory: Inventory & Reference;
  readonly base: BaseItem & Reference;

  static create(data: JSONEntity<InventoryItem>): InventoryItem {
    return cast<InventoryItem>(data);
  }
}
