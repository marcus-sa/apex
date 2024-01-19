import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { deserialize } from '@deepkit/type';

import {
  AuthService,
  importProvidersDynamicallyFrom,
  provideRpcClient,
} from '@apex/client';

import { routes } from './routes';
import { GameController } from './game';
import { MessengerController } from './messenger';
import { RoomController } from './room';
import { IntegrationsModule } from './integrations';

export class IntegrationsConfig {
  readonly supabase?: unknown;
  readonly featurebase?: unknown;
  readonly thirdweb?: unknown;
}

export class ApexClientServerConfig {
  readonly url: string = 'ws://localhost:8082';
}

export class ApexClientConfig {
  readonly integrations: IntegrationsConfig = new IntegrationsConfig();
  readonly server: ApexClientServerConfig = new ApexClientServerConfig();
}

export async function getClientConfig(): Promise<ApexClientConfig> {
  if (import.meta.env.DEV) {
    const result = await fetch('/assets/apex.config.yaml');
    const { parse } = await import('yaml');
    return deserialize<ApexClientConfig>(parse(await result.text()));
  }

  const result = await fetch('/config');
  return deserialize<ApexClientConfig>(await result.json());
}

export async function getAppConfig(): Promise<ApplicationConfig> {
  const clientConfig = await getClientConfig();

  return {
    providers: [
      // eslint-disable-next-line functional/prefer-readonly-type
      provideRouter(routes as Route[]),
      ...provideRpcClient(clientConfig.server.url, [
        GameController,
        RoomController,
        MessengerController,
      ]),
      {
        provide: ApexClientConfig,
        useValue: clientConfig,
      },
      await importProvidersDynamicallyFrom(
        new IntegrationsModule(clientConfig.integrations),
      ),
      {
        provide: APP_INITIALIZER,
        deps: [AuthService],
        useFactory: (auth: AuthService) => async () => auth.initialize(),
        multi: true,
      },
    ],
  };
}
