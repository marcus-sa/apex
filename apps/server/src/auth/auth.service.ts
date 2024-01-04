import { User } from '@apex/api/shared';

export interface JwtPayload {}

export abstract class AuthService {
  abstract verifyJwt(token: string): Promise<JwtPayload>;
  abstract getUserFromJwtPayload(payload: JwtPayload): Promise<User>;
}
