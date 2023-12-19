import 'zone.js/node';
import { join } from 'node:path';
import { startServer } from '@deepular/server';
import { RpcKernelSecurity } from '@deepkit/rpc';
import { RpcServer } from '@deepkit/framework';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { router } from './router';

import { ZeusRpcKernelSecurity, ZeusRpcServer } from './server';
import { RoomController } from './game/room/room.controller';

const publicDir = join(__dirname, 'public');
const documentPath = join(__dirname, '..', 'index.html');

void startServer(
  AppComponent,
  {
    controllers: [RoomController],
    providers: [
      {
        provide: RpcKernelSecurity,
        useClass: ZeusRpcKernelSecurity,
      },
      {
        provide: RpcServer,
        useClass: ZeusRpcServer,
      }
    ],
    documentPath,
    publicDir,
    router,
  },
  appConfig,
);
