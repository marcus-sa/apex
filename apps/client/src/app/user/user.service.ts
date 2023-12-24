import { Injectable } from '@angular/core';

import { User } from '@apex/api/shared';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly cached = new Set<User>();

  // @ts-ignore
  get me(): User {

  }
}
