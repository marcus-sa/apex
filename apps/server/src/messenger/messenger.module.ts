import { createModule } from '@deepkit/app';

import { MessengerController } from './messenger.controller';
import { MessengerRepository } from './messenger.repository';

export class MessengerModule extends createModule({
  providers: [MessengerRepository],
  controllers: [MessengerController],
  exports: [MessengerRepository],
  forRoot: true,
}) {}
