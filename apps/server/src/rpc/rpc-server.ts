import { WebSocket, App } from 'uWebSockets.js';
import { RpcKernelBaseConnection } from '@deepkit/rpc';
import {
  RpcServerCreateConnection,
  RpcServerListener,
  RpcServerOptions,
  RpcServerInterface,
} from '@deepkit/framework';

import { ApexRpcServerConfig } from '../config';

export class ApexRpcServer implements RpcServerInterface {
  private readonly connections = new WeakMap<
    WebSocket<undefined>,
    RpcKernelBaseConnection
  >();

  constructor(private readonly config: ApexRpcServerConfig) {}

  start(
    options: RpcServerOptions,
    createRpcConnection: RpcServerCreateConnection,
  ): RpcServerListener {
    // https://unetworkingab.medium.com/millions-of-active-websockets-with-node-js-7dc575746a01
    const server = App();

    server.ws('/', {
      idleTimeout: this.config.idleTimeout,
      maxLifetime: 0,
      open: (ws: WebSocket<undefined>) => {
        const connection = createRpcConnection({
          write(b) {
            ws.send(b, true);
          },
          close() {
            try {
              ws.close();
            } catch {
              /* eslint-disable no-empty */
            }
          },
          bufferedAmount() {
            return ws.getBufferedAmount();
          },
          clientAddress() {
            return new TextDecoder('utf8').decode(ws.getRemoteAddressAsText());
          },
        });
        this.connections.set(ws, connection);
      },
      message: (ws: WebSocket<undefined>, message: ArrayBuffer) => {
        const connection = this.connections.get(ws)!;
        connection.feed(new Uint8Array(message));
      },
      close: (ws: WebSocket<undefined>) => {
        const connection = this.connections.get(ws)!;
        connection.close();
        this.connections.delete(ws);
      },
    });

    server.listen(this.config.port, res => {
      if (!res) {
        throw new Error('Failed to start RPC server');
      }
    });

    return {
      close() {
        server.close();
      },
    };
  }
}
