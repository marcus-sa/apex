import { rpc } from '@deepkit/rpc';
import { uuid } from '@deepkit/type';
import { SignJWT } from 'jose';

import { User } from '@apex/api/shared';

import { FeaturebaseConfig } from './config';

@rpc.controller()
export class FeaturebaseController {
  constructor(
    private readonly config: FeaturebaseConfig,
    private readonly user: User,
  ) {}

  @rpc.action()
  async generateJwtToken(): Promise<string> {
    const key = new TextEncoder().encode(this.config.ssoKey);

    return await new SignJWT({
      email: this.user.email,
      name: this.user.username,
      jti: uuid(),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(key);
  }
}
