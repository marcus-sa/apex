import { InjectionToken } from '@angular/core';
import { ClassType } from '@deepkit/core';

export const AUTH_DIALOG_COMPONENT = new InjectionToken<ClassType<unknown>>(
  'AUTH_DIALOG_COMPONENT',
);

export abstract class AuthService {}
