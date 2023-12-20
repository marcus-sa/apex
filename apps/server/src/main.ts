import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { ZeusRpcServer, ZeusRpcKernelSecurity } from './rpc';
import { UserController } from './user';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { ZeusConfig } from './config';
import { InventoryController } from './inventory';
import { ZeusDatabase } from './database';

void new App({
  config: ZeusConfig,
  imports: [new FrameworkModule()],
  controllers: [
    UserController,
    MessengerController,
    RoomController,
    InventoryController,
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
      useClass: ZeusDatabase,
    },
  ],
})
  .loadConfigFromEnv({ prefix: 'ZEUS_' })
  .run(['server:start']);
