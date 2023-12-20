import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity } from '@deepkit/rpc';
import { MySQLDatabaseAdapter } from '@deepkit/mysql';
import { Database } from '@deepkit/orm';

import { ZeusRpcServer, ZeusRpcKernelSecurity } from './rpc';
import { UserController } from './user';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { ZeusConfig } from './config';

void new App({
  config: ZeusConfig,
  imports: [
    new FrameworkModule(),
  ],
  controllers: [
    UserController,
    MessengerController,
    RoomController,
  ],
  providers: [
    {
      provide: RpcServer,
      useClass: ZeusRpcServer,
    },
    {
      provide: RpcKernelSecurity,
      useClass: ZeusRpcKernelSecurity,
    },
    {
      provide: Database,
      useFactory() {
        return new Database(new MySQLDatabaseAdapter({
          database: process.env.DATABASE_NAME!,
          user: process.env.DATABASE_USERNAME!,
          password: process.env.DATABASE_PASSWORD!,
          host: process.env.DATABASE_HOST!,
          ssl: {
            rejectUnauthorized: true,
          },
        }), [])
      }
    }
  ]
}).run(['server:start'])
