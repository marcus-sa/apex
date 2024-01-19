import { ClassType } from '@deepkit/core';

import { DynamicNgModule } from '@apex/client';

import { IntegrationsConfig } from '../config';

export class IntegrationsModule extends DynamicNgModule<IntegrationsModule> {
  constructor(private readonly config: IntegrationsConfig) {
    super();
  }

  async register(
    config: any,
    loadModule: () => Promise<ClassType> | ClassType,
  ): Promise<void> {
    if (config) {
      this.addImport(await loadModule());
      this.addProvider({
        provide: config.constructor,
        useValue: config,
      });
    }
  }

  async process(): Promise<void> {
    await Promise.all([
      this.register(this.config.supabase, async () =>
        import('@apex/integrations/supabase/client').then(
          m => m.SupabaseModule,
        ),
      ),
      this.register(this.config.featurebase, async () =>
        import('@apex/integrations/featurebase/client').then(
          m => m.FeaturebaseModule,
        ),
      ),
    ]);
  }
}
