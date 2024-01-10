import { User } from '@apex/api/shared';
import { CreateUserData } from '@apex/api/server';

export abstract class AuthService {
  abstract authenticate(token: string): Promise<User>;
  abstract createUser(data: CreateUserData, token: string): Promise<User>;
}
