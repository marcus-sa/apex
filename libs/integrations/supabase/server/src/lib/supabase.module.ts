import { createModule } from '@deepkit/app';
import { createClient } from '@supabase/supabase-js';
import { provide } from '@deepkit/injector';

import { AuthService } from '@apex/server';

import { SupabaseAuthService } from './supabase-auth.service';
import { SupabaseConfig } from './config';
import { ISupabaseClient } from './client';

export class SupabaseModule extends createModule({
  config: SupabaseConfig,
  providers: [
    provide<ISupabaseClient>({
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
