import { integer } from '@deepkit/type';

export class ApexRpcServerConfig {
  readonly idleTimeout: integer = 300;
  readonly port: number = 8082;
}

export class ApexDatabaseConfig {
  readonly database: string;
  readonly user: string;
  readonly password: string;
  readonly host: string;
}

export class ApexConfig {
  readonly server: ApexRpcServerConfig = new ApexRpcServerConfig();
  readonly database: ApexDatabaseConfig;
}
