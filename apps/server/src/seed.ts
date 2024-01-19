import { cast } from '@deepkit/type';

import { Point, Room, User, UserPoint } from '@apex/api/shared';

import { ApexDatabase } from './database';
import { ApexDatabaseConfig } from './config';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-call
require('dotenv').config();

const config = cast<ApexDatabaseConfig>({
  adapter: process.env['APEX_DATABASE_ADAPTER'],
  host: process.env['APEX_DATABASE_HOST'],
  name: process.env['APEX_DATABASE_NAME'],
  password: process.env['APEX_DATABASE_PASSWORD'],
  user: process.env['APEX_DATABASE_USER'],
  port: process.env['APEX_DATABASE_PORT'],
});
const db = new ApexDatabase(config);

const point1 = new Point('credits');
const point2 = new Point('diamonds');

const user1 = new User('test', '');
const user1Point1 = new UserPoint(user1, point1, 10);
user1.addPoint(user1Point1);

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

await db.persist(
  point1,
  point2,
  user1,
  ...user1.points,
  ...user1.activeBadges,
  user1.inventory,
  room1,
);
