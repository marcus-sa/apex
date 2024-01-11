import { NgModule } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { cast } from '@deepkit/type';

import { AuthConfig, AuthService } from '@apex/client';

import { SupabaseAuthService } from './supabase-auth.service';
import { SupabaseConfig } from './config';

@NgModule({
  providers: [
    {
      provide: AuthService,
      useClass: SupabaseAuthService,
    },
    {
      provide: AuthConfig,
      deps: [SupabaseConfig],
      useFactory: (config: SupabaseConfig): AuthConfig => {
        return cast<AuthConfig>({
          providers: config.auth.providers,
        });
      },
    },
    {
      provide: SupabaseClient,
      deps: [SupabaseConfig],
      useFactory(config: SupabaseConfig): SupabaseClient {
        return createClient(config.url, config.key, {
          auth: {
            detectSessionInUrl: true,
          },
          global: {
            fetch: fetch.bind(globalThis),
          },
        });
      },
    },
  ],
})
export class SupabaseModule {}
