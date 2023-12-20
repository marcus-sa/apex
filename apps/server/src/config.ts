import { integer } from '@deepkit/type';

export class ZeusRpcServerConfig {
  readonly idleTimeout: integer = 300;
  readonly port: number = 8081;
}

export class ZeusConfig {
  readonly server: ZeusRpcServerConfig = new ZeusRpcServerConfig();
}
