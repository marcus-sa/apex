import { DynamicNgModule, IntegrationsConfig } from '@apex/client';
import { SupabaseModule } from '@apex/integrations/supabase/client';

export class IntegrationsModule extends DynamicNgModule<IntegrationsModule> {
  constructor(private readonly config: IntegrationsConfig) {
    super();
  }

  process() {
    if (this.config.supabase) {
      this.addImport(SupabaseModule);
    }
  }
}
