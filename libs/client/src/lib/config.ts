import { SupabaseConfig } from '@apex/integrations/supabase/client';

export class IntegrationsConfig {
  readonly supabase?: SupabaseConfig;
  readonly thirdweb?: unknown;
}

export class ApexClientConfig {
  readonly integrations: IntegrationsConfig = new IntegrationsConfig();
}
