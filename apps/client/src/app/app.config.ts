import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { deserialize } from '@deepkit/type';

import { ApexClientConfig, configureProvidersFrom } from '@apex/client';

import { routes } from './routes';
import { provideRpcClient } from './utils';
import { GameController } from './game';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { IntegrationsModule } from './integrations';

export const clientConfig = deserialize<ApexClientConfig>(
  (window as any)['APEX_CLIENT_CONFIG'],
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...provideRpcClient('ws://localhost:8082', [
      GameController,
      RoomController,
      MessengerController,
    ]),
    {
      provide: ApexClientConfig,
      useValue: clientConfig,
    },
    configureProvidersFrom(new IntegrationsModule(clientConfig.integrations)),
  ],
};
