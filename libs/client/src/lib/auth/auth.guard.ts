import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly auth: AuthService) {}

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }

  canActivateChild(): boolean {
    return this.auth.isAuthenticated();
  }
}
