import { createModule } from '@deepkit/app';

import { SupabaseModule } from './supabase';

export class IntegrationsConfig {
  readonly supabase?: any;
  readonly thirdweb?: any;
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
