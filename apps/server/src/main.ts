import { readFileSync } from 'node:fs';
import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity } from '@deepkit/rpc';
import { Database } from '@deepkit/orm';
import * as yaml from 'yaml';
import { DeepPartial } from '@deepkit/type';

import { GameModule } from './game';
import { InventoryController } from './inventory';
import { RoomModule } from './room';
import { ApexRpcServer, ApexRpcKernelSecurity } from './rpc';
import { UserModule } from './user';
import { MessengerModule } from './messenger';
import { ApexConfig } from './config';
import { ApexDatabase } from './database';
import { IntegrationsModule } from './integrations';

const app = new App({
  config: ApexConfig,
  imports: [
    new FrameworkModule({
      migrateOnStartup: true,
      debug: true,
      debugBrokerHost: 'http://localhost:8083',
    }),
    new IntegrationsModule(),
    new GameModule(),
    new RoomModule(),
    new UserModule(),
    new MessengerModule(),
  ],
  controllers: [InventoryController],
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
}).setup((module, config) => {
  module
    .getImportedModuleByClass(IntegrationsModule)
    .configure(config.integrations);
});

if (process.env['APEX_CONFIG_FILE']) {
  const configFile: string = readFileSync(
    process.env['APEX_CONFIG_FILE'],
    'utf8',
  );
  const config = yaml.parse(configFile) as DeepPartial<ApexConfig>;
  app.configure(config);
} else {
  app.loadConfigFromEnv({ prefix: 'APEX_' });
}

app.loadConfigFromEnvVariable('APEX_');

void app.run(['server:start']);
