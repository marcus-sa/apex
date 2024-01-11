import { Route } from '@angular/router';

import { AuthGuard } from '@apex/client';

import { RoomComponent } from './room';

export const routes: readonly Route[] = [
  {
    path: 'room/:id',
    canActivate: [AuthGuard],
    component: RoomComponent,
  },
];
