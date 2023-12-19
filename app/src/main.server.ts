import 'zone.js/node';
import { join } from 'node:path';
import { startServer } from '@deepular/server';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { router } from './router';

const publicDir = join(__dirname, 'public');
const documentPath = join(__dirname, '..', 'index.html');

void startServer(
  AppComponent,
  {
    controllers: [],
    documentPath,
    publicDir,
    router,
  },
  appConfig,
);
