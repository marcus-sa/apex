import { createModule } from '@deepkit/app';

import {
  SupabaseConfig,
  SupabaseModule,
} from '@apex/integrations/supabase/server';

export class IntegrationsConfig {
  readonly supabase?: SupabaseConfig;
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
  }
}
