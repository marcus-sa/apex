import { User } from '@apex/api/shared';

import { AuthService, JwtPayload } from '../../auth';

export class SupabaseAuthService extends AuthService {
  override async getUserFromJwtPayload(payload: JwtPayload): Promise<User> {
    throw new Error('Method not implemented.');
  }

  override async verifyJwt(token: string): Promise<JwtPayload> {
    throw new Error('Method not implemented.');
  }
}
