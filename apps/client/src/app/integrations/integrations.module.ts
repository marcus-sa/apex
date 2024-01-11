import { ClassType } from '@deepkit/core';

import { DynamicNgModule, IntegrationsConfig } from '@apex/client';
import { SupabaseModule } from '@apex/integrations/supabase/client';

export class IntegrationsModule extends DynamicNgModule<IntegrationsModule> {
  constructor(private readonly config: IntegrationsConfig) {
    super();
  }

  private register(config: any, module: ClassType): void {
    if (config) {
      this.addImport(module);
      this.addProvider({
        provide: config.constructor,
        useValue: config,
      });
    }
  }

  process(): void {
    this.register(this.config.supabase, SupabaseModule);
  }
}
