import { empty, Inject } from '@deepkit/core';
import { SupabaseClient } from '@supabase/supabase-js';

import { CreateUserData } from '@apex/api/server';
import { UnexpectedError, User } from '@apex/api/shared';
import { AuthService, UserRepository } from '@apex/server';

export class SupabaseAuthService extends AuthService {
  constructor(
    private readonly client: Inject<SupabaseClient>,
    private readonly user: UserRepository,
  ) {
    super();
  }

  private async getUserByToken(token: string) {
    const { data, error } = await this.client.auth.getUser(token);
    if (error) {
      throw error;
    }
    return data.user;
  }

  override async authenticate(token: string): Promise<User> {
    const user = await this.getUserByToken(token);
    if (empty(user.user_metadata)) {
      throw new UnexpectedError('Supabase user is missing user metadata');
    }
    const id = user.user_metadata['id'] as User['id'];
    return this.user.findOne({ id });
  }

  override async createUser(
    data: CreateUserData,
    token: string,
  ): Promise<User> {
    const supabaseUser = await this.getUserByToken(token);
    const user = await this.user.create(data);
    await this.client.auth.admin.updateUserById(supabaseUser.id, {
      user_metadata: {
        id: user.id,
      },
    });
    return user;
  }
}
