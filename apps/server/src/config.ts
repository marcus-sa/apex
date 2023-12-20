import { integer } from '@deepkit/type';

export class ZeusRpcServerConfig {
  readonly idleTimeout: integer = 300;
  readonly port: number = 8082;
}

export class ZeusDatabaseConfig {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly host: string;
}

export class ZeusConfig {
  readonly server: ZeusRpcServerConfig = new ZeusRpcServerConfig();
  readonly database: ZeusDatabaseConfig;
}
