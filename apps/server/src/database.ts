import { Database } from '@deepkit/orm';
import { MySQLDatabaseAdapter } from '@deepkit/mysql';
import { PostgresDatabaseAdapter } from '@deepkit/postgres';

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
  Point,
  Badge,
  UserBadge,
  UserPoint,
} from '@apex/api/shared';

import { ApexDatabaseConfig } from './config';

export class ApexDatabase extends Database {
  static createAdapter(config: ApexDatabaseConfig) {
    switch (config.adapter) {
      case 'mysql':
        return new MySQLDatabaseAdapter({
          database: config.name,
          ssl: {
            rejectUnauthorized: true,
          },
          ...config,
        });

      case 'postgres':
        return new PostgresDatabaseAdapter({
          database: config.name,
          ...config,
        });
    }
  }

  constructor(config: ApexDatabaseConfig) {
    super(ApexDatabase.createAdapter(config), [
      BaseItem,
      Badge,
      Point,
      User,
      UserBadge,
      UserPoint,
      Inventory,
      InventoryItem,
      RoomItem,
      Room,
      Catalogue,
      CataloguePage,
      CatalogueItem,
    ]);
  }
}
