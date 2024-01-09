import { rpc } from '@deepkit/rpc';
import { Observable, Subject } from 'rxjs';

import { MessengerControllerInterface, MessengerEvent } from '@apex/api/client';

@rpc.controller(MessengerControllerInterface)
export class MessengerController implements MessengerControllerInterface {
  readonly #events = new Subject<MessengerEvent>();

  get events(): Observable<MessengerEvent> {
    return this.#events.asObservable();
  }

  handleEvent(event: MessengerEvent): void {
    this.#events.next(event);
  }
}
