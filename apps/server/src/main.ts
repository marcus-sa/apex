import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { ApexRpcServer, ApexRpcKernelSecurity } from './rpc';
import { UserController } from './user';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { ApexConfig } from './config';
import { InventoryController } from './inventory';
import { ApexDatabase } from './database';

void new App({
  config: ApexConfig,
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
      useClass: ApexRpcServer,
    },
    {
      provide: RpcKernelSecurity,
      useClass: ApexRpcKernelSecurity,
    },
    {
      provide: Database,
      useClass: ApexDatabase,
    },
  ],
})
  .loadConfigFromEnv({ prefix: 'ZEUS_' })
  .run(['server:start']);
