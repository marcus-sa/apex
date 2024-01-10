import { InjectionToken } from '@angular/core';
import { ClassType } from '@deepkit/core';

export const AUTH_DIALOG_COMPONENT = new InjectionToken<
  ClassType<AuthDialogComponent>
>('AUTH_DIALOG_COMPONENT');

export interface AuthDialogComponent {}

export abstract class AuthService {}
