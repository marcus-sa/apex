import { createModule } from '@deepkit/app';
import { createClient } from '@supabase/supabase-js';
import { provide } from '@deepkit/injector';

import { AuthService } from '../../auth';
import { SupabaseAuthService } from './supabase-auth.service';
import { InternalSupabaseClient } from './supabase-client';

export class SupabaseConfig {
  readonly url: string;
  readonly key: string;
}

export class SupabaseModule extends createModule({
  config: SupabaseConfig,
  providers: [
    provide<InternalSupabaseClient>({
      useFactory(config: SupabaseConfig) {
        return createClient(config.url, config.key, {
          global: {
            fetch: fetch.bind(globalThis),
          },
        });
      },
    }),
    {
      provide: AuthService,
      useClass: SupabaseAuthService,
    },
  ],
  exports: [AuthService],
  forRoot: true,
}) {}
