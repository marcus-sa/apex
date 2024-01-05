import { createModule } from '@deepkit/app';
import { SessionState } from '@deepkit/rpc';

import { User } from '@apex/api/shared';

import { UserSession } from './user-session';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

export class UserModule extends createModule({
  controllers: [UserController],
  providers: [
    UserRepository,
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
  exports: [UserRepository, UserSession, User],
  forRoot: true,
}) {}
