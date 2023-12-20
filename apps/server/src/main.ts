import { App } from '@deepkit/app';
import { FrameworkModule, RpcServer } from '@deepkit/framework';

import { ZeusRpcServer } from './rpc-server';
import { GameController, RoomController, UserController } from './controllers';

void new App({
  imports: [
    new FrameworkModule(),
  ],
  controllers: [
    UserController,
    GameController,
    RoomController,
  ],
  providers: [
    {
      provide: RpcServer,
      useClass: ZeusRpcServer,
    }
  ]
}).run(['server:start'])
