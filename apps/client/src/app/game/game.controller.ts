import { rpc } from '@deepkit/rpc';
import { Observable, Subject } from 'rxjs';

import { GameControllerInterface, GameEvent } from '@apex/api/client';

@rpc.controller(GameControllerInterface)
export class GameController implements GameControllerInterface {
  readonly #events = new Subject<GameEvent>();

  get events(): Observable<GameEvent> {
    return this.#events.asObservable();
  }

  handleEvent(event: GameEvent): void {
    this.#events.next(event);
  }
}
