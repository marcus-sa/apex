import { RpcClient, RpcWebSocketClient, rpcClass, RpcKernel } from '@deepkit/rpc';
import { InjectorContext, InjectorModule } from '@deepkit/injector';
import { ClassType } from '@deepkit/core';
import { Provider } from '@angular/core';
import { filter, Observable } from 'rxjs';

export function ofType<T>(type: ClassType<T>): (observable: Observable<unknown>) => Observable<T> {
  return (observable) => observable.pipe(filter((value): value is T => value instanceof type));
}

export function provideRpcClient(url: string, controllers: readonly ClassType<unknown>[] = []): readonly Provider[] {
  return [
    {
      provide: InjectorContext,
      useFactory(): InjectorContext {
        return new InjectorContext(new InjectorModule());
      }
    },
    {
      provide: RpcClient,
      deps: [InjectorContext],
      useFactory: (injectorContext: InjectorContext): RpcWebSocketClient => {
        const client = new RpcWebSocketClient(url);
        client.clientKernel = new RpcKernel(injectorContext);
        controllers.forEach(controller => {
          const path = rpcClass._fetch(controller)!.getPath();
          client.registerController(controller, path);
        });
        void client.connect()
        return client;
      },
    },
    ...controllers.map(controller => ({
      provide: controller,
      deps: [InjectorContext],
      useFactory: (injectorContext: InjectorContext) => injectorContext.get(controller),
    })),
  ]
}
