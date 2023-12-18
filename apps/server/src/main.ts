import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { EventToken, BaseEvent, eventDispatcher } from '@deepkit/event';

export class RoomUserMove extends BaseEvent {
  constructor() {
    super();
  }
}

const roomUserMove = new EventToken<RoomUserMove>('room.user.move');

eventDispatcher.listen()

await new App({
  imports: [new FrameworkModule()],
}).run(['server:start']);
