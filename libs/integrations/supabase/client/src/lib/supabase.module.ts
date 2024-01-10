import { NgModule } from '@angular/core';

import { AUTH_DIALOG_COMPONENT, AuthService } from '@apex/client';

import { SupabaseAuthDialogComponent } from './supabase-auth-dialog.component';
import { SupabaseAuthService } from './supabase-auth.service';

@NgModule({
  providers: [
    {
      provide: AUTH_DIALOG_COMPONENT,
      useValue: SupabaseAuthDialogComponent,
    },
    {
      provide: AuthService,
      useClass: SupabaseAuthService,
    },
  ],
})
export class SupabaseModule {}
