import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { Room } from '@apex/api/shared';

export const ROOM = new InjectionToken<Subject<Room>>('ROOM', {
  providedIn: 'root',
  factory() {
    return new Subject<Room>();
  }
})
