import {
  EnvironmentProviders,
  importProvidersFrom,
  ModuleWithProviders,
  Provider,
} from '@angular/core';
import { ClassType } from '@deepkit/core';

import { setInjectorDef, setNgModuleDef } from './utils';

export type ConfigurableModuleProvider = Provider | EnvironmentProviders;

export function configureProvidersFrom(
  ...modules: readonly ConfigurableModule<any>[]
): EnvironmentProviders {
  return importProvidersFrom(...modules.map(module => module.configure()));
}

export class ConfigurableModule<M> {
  private readonly imports = new Set<ClassType>();
  private readonly providers = new Set<ConfigurableModuleProvider>();

  addProvider(provider: ConfigurableModuleProvider) {
    this.providers.add(provider);
  }

  addImport(module: ClassType) {
    this.imports.add(module);
  }

  configure(): ModuleWithProviders<M> {
    setNgModuleDef(this.constructor, {
      type: this.constructor,
      imports: [...this.imports],
    });

    setInjectorDef(this.constructor, {
      imports: [...this.imports],
      providers: [...this.providers],
    });

    return {
      ngModule: this.constructor as ClassType<M>,
      providers: [],
    };
  }
}
