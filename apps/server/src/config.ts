import { integer } from '@deepkit/type';

import { ApexClientConfig } from '@apex/client';

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

export class ApexServerConfig {
  readonly rpc: ApexRpcServerConfig = new ApexRpcServerConfig();
  readonly integrations: IntegrationsConfig = new IntegrationsConfig();
  readonly database: ApexDatabaseConfig;
}

export class ApexSharedConfig {}

export class ApexConfig {
  readonly server: ApexServerConfig = new ApexServerConfig();
  readonly client: ApexClientConfig = new ApexClientConfig();
  // readonly shared: ApexSharedConfig = new ApexSharedConfig();
}
