import { empty } from '@deepkit/core';

import { CreateUserData } from '@apex/api/server';
import { User } from '@apex/api/shared';

import { AuthService } from '../../auth';
import { UserRepository } from '../../user';
import { InternalSupabaseClient } from './supabase-client';

export class SupabaseAuthService extends AuthService {
  constructor(
    private readonly client: InternalSupabaseClient,
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
      throw new Error('Missing user metadata');
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
