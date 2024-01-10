import { User } from '@apex/api/shared';

import { Repository } from '../repository';

export class UserRepository extends Repository(User) {
  async setOnline(user: User): Promise<void> {
    await this.update(user, { online: true });
    user.setOnline(true);
  }

  async setOffline(user: User): Promise<void> {
    await this.update(user, { online: false });
    user.setOnline(false);
  }
}
