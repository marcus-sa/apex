import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, Route } from '@angular/router';

import {
  ApexClientConfig,
  AuthService,
  getClientConfig,
  importProvidersDynamicallyFrom,
  provideRpcClient,
} from '@apex/client';

import { routes } from './routes';
import { GameController } from './game';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { IntegrationsModule } from './integrations';

export const clientConfig = getClientConfig();

export const appConfig: ApplicationConfig = {
  providers: [
    // eslint-disable-next-line functional/prefer-readonly-type
    provideRouter(routes as Route[]),
    ...provideRpcClient('ws://localhost:8082', [
      GameController,
      RoomController,
      MessengerController,
    ]),
    {
      provide: ApexClientConfig,
      useValue: clientConfig,
    },
    importProvidersDynamicallyFrom(
      new IntegrationsModule(clientConfig.integrations),
    ),
    {
      provide: APP_INITIALIZER,
      deps: [AuthService],
      useFactory: (auth: AuthService) => () => auth.initialize(),
      multi: true,
    },
  ],
};
