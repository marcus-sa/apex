import { provideRouter, ServerController } from '@deepular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { GameComponent } from './game';
import type { RoomController } from './game/room';
import { RoomComponent } from './game/room';

export const router = provideRouter([
  {
    path: 'game',
    component: GameComponent,
    children: [
      {
        path: 'room/:id',
        component: RoomComponent,
        imports: [],
        resolve: {
          info: (room: ServerController<RoomController>, route: ActivatedRouteSnapshot) => room.getInfo(route.params['id']),
        },
      },
    ],
  }
]);
