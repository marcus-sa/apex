import { Route } from '@angular/router';

import { RoomComponent } from './room';

export const routes: Route[] = [
  {
    path: 'room/:id',
    component: RoomComponent,
  }
];
