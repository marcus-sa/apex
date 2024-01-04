import { App } from '@deepkit/app';
import { cast } from '@deepkit/type';

import { Inventory, Room, User } from '@apex/api/shared';

import { ApexDatabase } from './database';
import { ApexDatabaseConfig } from './config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-call
require('dotenv').config();

void (async () => {
  const config = cast<ApexDatabaseConfig>({
    adapter: process.env['APEX_DATABASE_ADAPTER'],
    host: process.env['APEX_DATABASE_HOST'],
    name: process.env['APEX_DATABASE_NAME'],
    password: process.env['APEX_DATABASE_PASSWORD'],
    user: process.env['APEX_DATABASE_USER'],
    port: process.env['APEX_DATABASE_PORT'],
  });
  const db = new ApexDatabase(config);

  const user1 = User.create({
    username: 'Test',
    look: '',
  });

  const room1 = Room.create({
    name: 'Room 1',
    owner: user1,
    map: `
xxxxxxxxxx
x000000000
0000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
    `,
  });

  await db.persist(user1, user1.inventory, room1);
})();
