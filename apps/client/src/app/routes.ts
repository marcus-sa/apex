import { Route } from '@angular/router';

import { GameComponent } from './game';
import { RoomComponent } from './game/room';

export const routes: Route[] = [
  {
    path: 'game',
    component: GameComponent,
    children: [
      {
        path: 'room/:id',
        component: RoomComponent,
      }
    ]
  }
];
