import { createModule } from '@deepkit/app';

import { RoomManager } from './room-manager';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';

export class RoomModule extends createModule({
  providers: [RoomManager, RoomRepository],
  controllers: [RoomController],
  exports: [RoomManager, RoomRepository],
  forRoot: true,
}) {}
