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
} from '@zeus/api/shared';

import { ZeusDatabaseConfig } from './config';

export class ZeusDatabase extends Database {
  constructor(config: ZeusDatabaseConfig) {
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
