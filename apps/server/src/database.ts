import { Database } from '@deepkit/orm';
import { MySQLDatabaseAdapter } from '@deepkit/mysql';

import {
  BaseItem,
  Catalogue,
  CatalogueItem,
  CataloguePage,
  Inventory,
  InventoryItem,
  Room,
  RoomItem,
  User,
} from '@apex/api/shared';

import { ApexDatabaseConfig } from './config';

export class ApexDatabase extends Database {
  constructor(config: ApexDatabaseConfig) {
    super(
      new MySQLDatabaseAdapter({
        ...config,
        ssl: {
          rejectUnauthorized: true,
        },
      }),
      [
        Inventory,
        InventoryItem,
        User,
        Room,
        RoomItem,
        Catalogue,
        CatalogueItem,
        CataloguePage,
        BaseItem,
      ],
    );
  }
}
