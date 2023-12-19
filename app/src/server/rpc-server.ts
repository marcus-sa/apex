import { WebSocket, App } from 'uWebSockets.js';
import {
  RpcServerCreateConnection,
  RpcServerListener,
  RpcServerOptions,
  RpcServerInterface,
  FrameworkConfig,
} from '@deepkit/framework';
import { RpcKernelBaseConnection } from '@deepkit/rpc';


// https://unetworkingab.medium.com/millions-of-active-websockets-with-node-js-7dc575746a01
export class ZeusRpcServer implements RpcServerInterface {
  readonly connections = new WeakMap<WebSocket<unknown>, RpcKernelBaseConnection>();

  constructor(private readonly config: FrameworkConfig) {
  }

  start(options: RpcServerOptions, createRpcConnection: RpcServerCreateConnection): RpcServerListener {
    const server = App();

    server.ws('/' ,{
      open: (ws: WebSocket<unknown>) => {
        const connection = createRpcConnection({
          write(b) {
            ws.send(b);
          },
          close() {
            ws.close();
          },
          bufferedAmount(): number {
            return ws.getBufferedAmount();
          },
          clientAddress(): string {
            return new TextDecoder('utf-8').decode(ws.getRemoteAddressAsText());
          }
        });
        this.connections.set(ws, connection);
      },
      message: (ws: WebSocket<unknown>, message: ArrayBuffer) => {
        const connection = this.connections.get(ws);
        connection.feed(new Uint8Array(message));
      },
      close: (ws: WebSocket<unknown>) => {
        const connection = this.connections.get(ws);
        connection.close();
        this.connections.delete(ws);
      }
    })

    server.listen(this.config.port, console.log);

    return {
      close() {
        server.close();
      },
    };
  }
}
