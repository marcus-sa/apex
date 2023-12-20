import {
  AutoIncrement,
  BackReference,
  integer,
  JSONEntity,
  PrimaryKey,
  cast,
  entity,
  Reference,
} from '@deepkit/type';

import { Inventory } from './inventory';
import { BaseItem } from '../../../../../../apps/server/src/item/baseItem';

@entity.name('inventory-item')
export class InventoryItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly inventory: Inventory & BackReference;
  readonly base: BaseItem & Reference;

  static create(data: JSONEntity<InventoryItem>): InventoryItem {
    return cast<InventoryItem>(data);
  }
}
