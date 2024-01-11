import { createModule } from '@deepkit/app';

import { AuthController } from './auth.controller';

export class AuthModule extends createModule({
  controllers: [AuthController],
  forRoot: true,
}) {}
