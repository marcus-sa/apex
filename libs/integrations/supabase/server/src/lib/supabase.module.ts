import { createModule } from '@deepkit/app';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { provide } from '@deepkit/injector';

import { AuthService } from '@apex/server';

import { SupabaseAuthService } from './supabase-auth.service';
import { SupabaseConfig } from './config';

export class SupabaseModule extends createModule({
  config: SupabaseConfig,
  providers: [
    provide<SupabaseClient>({
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
