import {
  AutoIncrement,
  integer,
  Positive,
  PrimaryKey,
  Reference,
} from '@deepkit/type';
import { BackReference, entity } from '@deepkit/type';

import { BaseItem } from '../base-item';
import { CataloguePage } from './catalogue-page';

@entity.name('catalogue-item')
export class CatalogueItem {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly name: string;
  readonly page: CataloguePage & Reference;
  readonly base: BaseItem & Reference;
  readonly cost: integer & Positive;
  readonly amount: integer & Positive;
}
