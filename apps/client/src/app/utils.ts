import { RpcClient, RpcWebSocketClient, rpcClass } from '@deepkit/rpc';
import { ClassType } from '@deepkit/core';
import { Provider } from '@angular/core';

export function provideRpcClient(url: string, controllers?: ClassType<unknown>[]): Provider {
  return {
    provide: RpcClient,
    useFactory: () => {
      const client = new RpcWebSocketClient(url);
      controllers?.forEach(controller => {
        const path = rpcClass._fetch(controller)!.getPath();
        client.registerController(controller, path);
      });
      void client.connect()
      return client;
    },
  }
}
