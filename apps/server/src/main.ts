import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity, SessionState } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { GameModule } from './game';
import { InventoryController } from './inventory';
import { RoomModule } from './room';
import { ApexRpcServer, ApexRpcKernelSecurity } from './rpc';
import { UserModule } from './user';
import { MessengerController } from './messenger';
import { ApexConfig } from './config';
import { ApexDatabase } from './database';

void new App({
  config: ApexConfig,
  imports: [
    new FrameworkModule({
      migrateOnStartup: true,
      debug: true,
      debugBrokerHost: 'http://localhost:8083',
    }),
    new GameModule(),
    new RoomModule(),
    new UserModule(),
  ],
  controllers: [MessengerController, InventoryController],
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
  // TODO: load config from yaml/json file
  .loadConfigFromEnv({ prefix: 'APEX_' })
  .run(['server:start']);
