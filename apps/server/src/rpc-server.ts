import { WebSocket, App } from 'uWebSockets.js';
import { RpcKernelBaseConnection, RemoteController } from '@deepkit/rpc';
import {
  RpcServerCreateConnection,
  RpcServerListener,
  RpcServerOptions,
  RpcServerInterface,
  FrameworkConfig,
} from '@deepkit/framework';

import { GameControllerInterface, RoomControllerInterface } from '@zeus/api/client';

// https://unetworkingab.medium.com/millions-of-active-websockets-with-node-js-7dc575746a01
export class ZeusRpcServer implements RpcServerInterface {
  readonly connections = new Map<WebSocket<undefined>, RpcKernelBaseConnection>();
  readonly clientControllers = new Map<RpcKernelBaseConnection, {
    game: RemoteController<GameControllerInterface>,
    room: RemoteController<RoomControllerInterface>,
  }>;

  constructor(private readonly config: FrameworkConfig) {}

  private createClientControllers(connection: RpcKernelBaseConnection): void {
    const game = connection.controller<GameControllerInterface>(GameControllerInterface);
    const room = connection.controller<RoomControllerInterface>(RoomControllerInterface);

    this.clientControllers.set(connection, {
      game,
      room,
    });
  }

  start(options: RpcServerOptions, createRpcConnection: RpcServerCreateConnection): RpcServerListener {
    const server = App();

    server.ws('/' ,{
      open: (ws: WebSocket<undefined>) => {
        const connection = createRpcConnection({
          write(b) {
            ws.send(b, true);
          },
          close() {
            ws.close();
          },
          bufferedAmount() {
            return ws.getBufferedAmount();
          },
          clientAddress() {
            return new TextDecoder('utf8').decode(ws.getRemoteAddressAsText());
          }
        });
        this.connections.set(ws, connection);
        this.createClientControllers(connection);
      },
      message: (ws: WebSocket<undefined>, message: ArrayBuffer) => {
        const connection = this.connections.get(ws);
        connection.feed(new Uint8Array(message));
      },
      close: (ws: WebSocket<undefined>) => {
        const connection = this.connections.get(ws);
        connection.close();
        this.connections.delete(ws);
      }
    });

    server.listen(this.config.port + 1, (res) => {
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
