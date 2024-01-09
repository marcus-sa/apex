import { rpc } from '@deepkit/rpc';
import { Observable, Subject } from 'rxjs';

import { RoomControllerInterface, RoomEvent } from '@apex/api/client';
import { Room, RoomChatMessage, User } from '@apex/api/shared';

@rpc.controller(RoomControllerInterface)
export class RoomController implements RoomControllerInterface {
  #events = new Subject<RoomEvent>();

  get events(): Observable<RoomEvent> {
    return this.#events.asObservable();
  }

  banMe(reason?: string): void {}

  handleChatMessage(chat: RoomChatMessage): void {}

  handleUserJoined(user: User): void {}

  handleUserLeft(user: User): void {}

  handleUpdates(room: Room) {}

  kickMe(reason?: string): void {}

  handleEvent(event: RoomEvent): void {
    this.#events.next(event);
  }
}
