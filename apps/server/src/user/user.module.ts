import { createModule } from '@deepkit/app';
import { SessionState } from '@deepkit/rpc';

import { UserSession } from './user-session';
import { UserController } from './user.controller';

export class UserModule extends createModule({
  controllers: [UserController],
  providers: [
    {
      provide: UserSession,
      scope: 'rpc',
      useFactory(sessionState: SessionState): UserSession {
        return sessionState.getSession() as UserSession;
      },
    },
  ],
  exports: [UserSession],
  forRoot: true,
}) {}
