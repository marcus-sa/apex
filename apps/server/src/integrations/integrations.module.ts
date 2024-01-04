import { createModule } from '@deepkit/app';

import { SupabaseModule } from './supabase';

export class IntegrationsConfig {
  readonly supabase?: boolean;
  readonly thirdweb?: boolean;
}

export class IntegrationsModule extends createModule({
  config: IntegrationsConfig,
  forRoot: true,
}) {
  override process() {
    if (this.config.supabase) {
      this.addImport(new SupabaseModule());
    }
  }
}
