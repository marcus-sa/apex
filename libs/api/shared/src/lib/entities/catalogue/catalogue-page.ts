import type {
  AutoIncrement,
  BackReference,
  integer,
  PrimaryKey,
} from '@deepkit/type';
import { entity } from '@deepkit/type';

import type { CatalogueItem } from './catalogue-item';

@entity.name('catalogue-page')
export class CataloguePage {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly items: readonly CatalogueItem[] & BackReference;
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
