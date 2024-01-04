import { createModule } from '@deepkit/app';

import { AuthService } from '../../auth';
import { SupabaseAuthService } from './supabase-auth.service';

export class SupabaseModule extends createModule({
  providers: [
    {
      provide: AuthService,
      useClass: SupabaseAuthService,
    },
  ],
  forRoot: true,
}) {}
