import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes';
import { provideRpcClient } from './utils';
import { GameController } from './game';
import { MessengerController } from './messenger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRpcClient('ws://localhost:8082', [GameController, MessengerController]),
  ],
};
