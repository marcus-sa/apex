import { Session } from '@deepkit/rpc';

import { User } from '@apex/api/shared';

export class UserSession extends Session {
  constructor(
    readonly user: User,
    token: string,
  ) {
    super(user.username, token);
  }
}
