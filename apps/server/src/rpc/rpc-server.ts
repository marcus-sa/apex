import { WebSocket, App } from 'uWebSockets.js';
import { RpcKernelBaseConnection } from '@deepkit/rpc';
import { Logger } from '@deepkit/logger';
import {
  RpcServerCreateConnection,
  RpcServerListener,
  RpcServerOptions,
  RpcServerInterface,
} from '@deepkit/framework';

import { ApexRpcServerConfig } from '../config';
import { GameManager } from '../game';

export class ApexRpcServer implements RpcServerInterface {
  private readonly connections = new WeakMap<
    WebSocket<undefined>,
    RpcKernelBaseConnection
  >();

  constructor(
    private readonly config: ApexRpcServerConfig,
    private readonly game: GameManager,
    private readonly logger: Logger,
  ) {}

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
        queueMicrotask(async () => this.game.disconnect(connection));
      },
    });

    server.listen(this.config.port, res => {
      if (!res) {
        throw new Error('Failed to start RPC server');
      }
      this.logger.log(`RPC listening at ws://localhost:${this.config.port}`);
    });

    return {
      close() {
        server.close();
      },
    };
  }
}
