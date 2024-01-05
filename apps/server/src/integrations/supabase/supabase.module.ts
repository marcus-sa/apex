import { createModule } from '@deepkit/app';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { AuthService } from '../../auth';
import { SupabaseAuthService } from './supabase-auth.service';

export class SupabaseConfig {
  readonly url: string;
  readonly key: string;
}

export class SupabaseModule extends createModule({
  config: SupabaseConfig,
  providers: [
    {
      provide: SupabaseClient,
      useFactory(config: SupabaseConfig) {
        return createClient(config.url, config.key, {
          global: {
            fetch: fetch.bind(globalThis),
          },
        });
      },
    },
    {
      provide: AuthService,
      useClass: SupabaseAuthService,
    },
  ],
  forRoot: true,
}) {}
