import { readFileSync } from 'node:fs';
import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { Database } from '@deepkit/orm';
import { DeepPartial, serialize } from '@deepkit/type';
import { HttpRouterRegistry } from '@deepkit/http';
import { Response } from '@deepkit/http';
import * as yaml from 'yaml';

import { ApexClientConfig } from '@apex/client';
import { UserModule } from '@apex/server';

import { GameModule } from './game';
import { InventoryController } from './inventory';
import { RoomModule } from './room';
import { RpcModule } from './rpc';
import { MessengerModule } from './messenger';
import { ApexConfig } from './config';
import { ApexDatabase } from './database';
import { IntegrationsModule } from './integrations';

const app = new App({
  config: ApexConfig,
  imports: [
    new FrameworkModule({
      migrateOnStartup: true,
      host: 'localhost',
      // debug: true,
      // debugBrokerHost: 'http://localhost:8083',
    }),
    new IntegrationsModule(),
    new GameModule(),
    new RoomModule(),
    new UserModule(),
    new MessengerModule(),
    new RpcModule(),
  ],
  controllers: [InventoryController],
  providers: [
    {
      provide: Database,
      useClass: ApexDatabase,
    },
  ],
}).setup((module, config: ApexConfig) => {
  module
    .getImportedModuleByClass(IntegrationsModule)
    .configure(config.server.integrations);
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

const router = app.get(HttpRouterRegistry);

router.get(
  '/config.js',
  () =>
    new Response(
      `window.APEX_CLIENT_CONFIG = ${JSON.stringify(
        serialize<ApexClientConfig>(app.appModule.config.client),
      )}`,
      'text/javascript',
    ),
);

void app.run(['server:start']);
