import { integer } from '@deepkit/type';

import { IntegrationsConfig } from './integrations';

export class ApexRpcServerConfig {
  readonly idleTimeout: integer = 960;
  readonly port: number = 8082;
}

export class ApexDatabaseConfig {
  readonly adapter: 'postgres' | 'mysql';
  readonly name: string;
  readonly user: string;
  readonly password: string;
  readonly host: string;
  readonly port?: number;
}

export class ApexConfig {
  readonly server: ApexRpcServerConfig = new ApexRpcServerConfig();
  readonly integrations?: IntegrationsConfig;
  readonly database: ApexDatabaseConfig;
}
