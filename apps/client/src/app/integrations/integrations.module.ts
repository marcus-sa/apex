import { ModuleWithProviders, NgModule } from '@angular/core';

import { ConfigurableModule, IntegrationsConfig } from '@apex/client';
import { SupabaseModule } from '@apex/integrations/supabase/client';

@NgModule({})
export class IntegrationsModule extends ConfigurableModule<IntegrationsModule> {
  constructor(private readonly config: IntegrationsConfig) {
    super();
  }

  configure(): ModuleWithProviders<IntegrationsModule> {
    if (this.config.supabase) {
      this.addImport(SupabaseModule);
    }

    return super.configure();
  }
}
