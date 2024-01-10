import { NgModule } from '@angular/core';

import { AUTH_DIALOG_COMPONENT } from '@apex/client';

import { SupabaseAuthDialogComponent } from './supabase-auth-dialog.component';

@NgModule({
  providers: [
    {
      provide: AUTH_DIALOG_COMPONENT,
      useValue: SupabaseAuthDialogComponent,
    },
  ],
})
export class SupabaseModule {}
