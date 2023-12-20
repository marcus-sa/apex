import { AutoIncrement, entity, integer, PrimaryKey } from '@deepkit/type';

import { CataloguePage } from './catalogue-page';

@entity.name('catalogue')
export class Catalogue {
  readonly id: integer & PrimaryKey & AutoIncrement;
  readonly pages: readonly CataloguePage[];
}
