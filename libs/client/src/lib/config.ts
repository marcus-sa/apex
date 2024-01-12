import { deserialize } from '@deepkit/type';

// FIXME: circular dependency
// import { SupabaseConfig } from '@apex/integrations/supabase/client';
// import { FeaturebaseConfig } from '@apex/integrations/featurebase/client';
// import { ThirdWebConfig } from '@apex/integrations/thirdweb/client';

export class IntegrationsConfig {
  readonly supabase?: unknown; // SupabaseConfig
  readonly featurebase?: unknown; // Featurebase
  readonly thirdweb?: unknown; // ThirdWebConfig
}

export class ApexClientConfig {
  readonly integrations: IntegrationsConfig = new IntegrationsConfig();
}

export const CLIENT_CONFIG_GLOBAL_VARIABLE_NAME = 'APEX_CLIENT_CONFIG';

export function getClientConfig(): ApexClientConfig {
  return deserialize<ApexClientConfig>(
    (globalThis as any)[CLIENT_CONFIG_GLOBAL_VARIABLE_NAME],
  );
}
