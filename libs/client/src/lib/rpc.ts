import { InjectorContext, InjectorModule } from '@deepkit/injector';
import { ClassType } from '@deepkit/core';
import { Provider } from '@angular/core';
import { filter, Observable } from 'rxjs';
import {
  RpcClient,
  RpcWebSocketClient,
  rpcClass,
  RpcKernel,
} from '@deepkit/rpc';

import { AuthService } from './auth';

export function ofType<T>(
  type: ClassType<T>,
): (observable: Observable<unknown>) => Observable<T> {
  return observable =>
    observable.pipe(filter((value): value is T => value instanceof type));
}

export function provideRpcClient(
  url: string,
  controllers: readonly ClassType<unknown>[] = [],
): readonly Provider[] {
  return [
    {
      provide: InjectorContext,
      useFactory(): InjectorContext {
        return new InjectorContext(new InjectorModule());
      },
    },
    {
      provide: RpcClient,
      deps: [InjectorContext, AuthService],
      useFactory: (
        injector: InjectorContext,
        auth: AuthService,
      ): RpcWebSocketClient => {
        const client = new RpcWebSocketClient(url);
        client.clientKernel = new RpcKernel(injector);
        controllers.forEach(controller => {
          const path = rpcClass._fetch(controller)!.getPath();
          client.registerController(controller, path);
        });
        if (auth.isAuthenticated()) {
          client.token.set(auth.getToken());
        }
        void client.connect();
        return client;
      },
    },
    ...controllers.map(controller => ({
      provide: controller,
      deps: [InjectorContext],
      useFactory: (injector: InjectorContext) => injector.get(controller),
    })),
  ];
}
