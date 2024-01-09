import { createModule } from '@deepkit/app';
import { RpcServer } from '@deepkit/framework';
import { RpcKernelSecurity } from '@deepkit/rpc';

import { ApexRpcServer } from './rpc-server';
import { ApexRpcKernelSecurity } from './rpc-kernel-security';

export class RpcModule extends createModule({
  providers: [
    {
      provide: RpcServer,
      useClass: ApexRpcServer,
    },
    {
      provide: RpcKernelSecurity,
      useClass: ApexRpcKernelSecurity,
    },
  ],
  exports: [RpcServer, RpcKernelSecurity],
  forRoot: true,
}) {}
