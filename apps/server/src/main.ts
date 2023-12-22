import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity, SessionState } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';

import { ApexRpcServer, ApexRpcKernelSecurity } from './rpc';
import { UserController } from './user';
import { MessengerController } from './messenger';
import { RoomModule } from './room';
import { ApexConfig } from './config';
import { InventoryController } from './inventory';
import { ApexDatabase } from './database';
import { UserSession } from './user-session';

void new App({
  config: ApexConfig,
  imports: [
    new FrameworkModule({
      migrateOnStartup: true,
    }),
    new RoomModule(),
  ],
  controllers: [UserController, MessengerController, InventoryController],
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
    {
      provide: UserSession,
      scope: 'rpc',
      useFactory(sessionState: SessionState): UserSession {
        return sessionState.getSession() as UserSession;
      },
    },
  ],
})
  .loadConfigFromEnv({ prefix: 'APEX_' })
  .run(['server:start']);
