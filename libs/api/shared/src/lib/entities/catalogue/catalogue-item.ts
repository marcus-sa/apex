import {
  AutoIncrement,
  BackReference,
  entity,
  integer,
  Positive,
  PrimaryKey,
  Reference,
} from '@deepkit/type';

import { CataloguePage } from './catalogue-page';
import { BaseItem } from '../../../../../../apps/server/src/item/baseItem';

@entity.name('catalogue-item')
export class CatalogueItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly name: string;
  readonly page: CataloguePage & BackReference;
  readonly base: BaseItem & Reference;
  readonly cost: integer & Positive;
  readonly amount: integer & Positive;
}
