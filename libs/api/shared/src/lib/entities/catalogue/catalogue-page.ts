import {
  AutoIncrement,
  entity,
  integer,
  PrimaryKey,
  Reference,
} from '@deepkit/type';

import { CatalogueItem } from './catalogue-item';

@entity.name('catalogue-page')
export class CataloguePage {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly items: readonly CatalogueItem[] & Reference;
  readonly caption: string;
  readonly visible: boolean = true;
  readonly enabled: boolean = true;
  readonly minRank?: integer;
  readonly layout: string;
  readonly imageHeadline: string;
  readonly imageTeaser: string;
  readonly textHeader: string;
  readonly textDetails: string;
  readonly textMisc: string;
  readonly textMisc2: string;
}
