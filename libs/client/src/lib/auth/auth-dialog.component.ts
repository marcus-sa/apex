import { Component, signal } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { ApexDialogBodyComponent } from '@apex/ui';

import { AuthConfig } from './config';
import { AuthService } from './auth.service';

@Component({
  selector: 'apex-supabase-auth-dialog',
  standalone: true,
  template: `
    <div apex-dialog-body>
      <div
        *ngIf="config.hasProviders()"
        class="grid grid-rows-2 gap-3 lg:grid-rows-3"
      >
        <div
          *ngFor="let provider of config.providers"
          (click)="auth.signInWithOAuth(provider)"
        ></div>
      </div>
    </div>
  `,
  imports: [ApexDialogBodyComponent, NgForOf, NgIf],
})
export class AuthDialogComponent {
  protected loading = signal(false);

  constructor(
    protected readonly config: AuthConfig,
    protected readonly auth: AuthService,
  ) {}
}
