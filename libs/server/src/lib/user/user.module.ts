import { createModule } from '@deepkit/app';
import { SessionState } from '@deepkit/rpc';

import { User } from '@apex/api/shared';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserBadgeRepository } from './user-badge.repository';
import { UserPointRepository } from './user-point.repository';
import { UserSession } from './user-session';

export class UserModule extends createModule({
  controllers: [UserController],
  providers: [
    UserRepository,
    UserBadgeRepository,
    UserPointRepository,
    {
      provide: UserSession,
      scope: 'rpc',
      useFactory(sessionState: SessionState): UserSession {
        return sessionState.getSession() as UserSession;
      },
    },
    {
      provide: User,
      scope: 'rpc',
      useFactory(session: UserSession): User {
        return session.user;
      },
    },
  ],
  exports: [
    UserRepository,
    UserBadgeRepository,
    UserPointRepository,
    UserSession,
    User,
  ],
  forRoot: true,
}) {}
