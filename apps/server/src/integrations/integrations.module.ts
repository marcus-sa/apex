import { createModule } from '@deepkit/app';

import {
  SupabaseConfig,
  SupabaseModule,
} from '@apex/integrations/supabase/server';
import {
  FeaturebaseConfig,
  FeaturebaseModule,
} from '@apex/integrations/featurebase/server';

export class IntegrationsConfig {
  readonly supabase?: SupabaseConfig;
  readonly featurebase?: FeaturebaseConfig;
  readonly thirdweb?: unknown;
}

export class IntegrationsModule extends createModule({
  config: IntegrationsConfig,
  forRoot: true,
}) {
  override process(): void {
    if (this.config.supabase) {
      this.addImport(new SupabaseModule(this.config.supabase));
    }

    if (this.config.featurebase) {
      this.addImport(new FeaturebaseModule(this.config.featurebase));
    }
  }
}
