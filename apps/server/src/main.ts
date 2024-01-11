import { readFileSync } from 'fs';
import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { Database } from '@deepkit/orm';
import { DeepPartial, serialize } from '@deepkit/type';
import { HttpRouterRegistry } from '@deepkit/http';
import { Response } from '@deepkit/http';
import * as yaml from 'yaml';

import { AuthModule, UserModule } from '@apex/server';
import {
  ApexClientConfig,
  CLIENT_CONFIG_GLOBAL_VARIABLE_NAME,
} from '@apex/client';

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
    new AuthModule(),
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
      `globalThis.${CLIENT_CONFIG_GLOBAL_VARIABLE_NAME} = ${JSON.stringify(
        serialize<ApexClientConfig>(app.appModule.config.client),
      )}`,
      'text/javascript',
    ),
);

await app.run(['server:start']);
