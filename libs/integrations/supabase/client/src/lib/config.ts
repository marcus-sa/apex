import { Provider } from '@supabase/supabase-js';

export class SupabaseConfig {
  readonly url: string;
  readonly key: string;
  readonly auth: SupabaseAuthConfig = new SupabaseAuthConfig();
  // readonly auth: AuthConfig = new AuthConfig();
}

export class SupabaseAuthConfig {
  readonly providers: readonly Provider[] = [];
}
