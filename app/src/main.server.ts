import 'zone.js/node';
import { join } from 'node:path';
import { startServer } from '@deepular/server';
import { RpcKernelSecurity } from '@deepkit/rpc';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { router } from './router';

import { RoomController } from './game/room/room.controller';
import { GameRpcKernelSecurity } from './rpc-kernel-security';

const publicDir = join(__dirname, 'public');
const documentPath = join(__dirname, '..', 'index.html');

void startServer(
  AppComponent,
  {
    controllers: [RoomController],
    providers: [
      {
        provide: RpcKernelSecurity,
        useClass: GameRpcKernelSecurity,
      },
    ],
    documentPath,
    publicDir,
    router,
  },
  appConfig,
);
