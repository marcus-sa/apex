import type { ClassType } from '@deepkit/core';
import type {
  EnvironmentProviders,
  ModuleWithProviders,
  Provider,
} from '@angular/core';
import { importProvidersFrom } from '@angular/core';

import { setFactoryDef, setInjectorDef, setNgModuleDef } from './utils';

export type NgModuleProvider = Provider | EnvironmentProviders;

export function importProvidersDynamicallyFrom(
  ...modules: readonly DynamicNgModule<unknown>[]
): EnvironmentProviders {
  return importProvidersFrom(...modules.map(module => module.configure()));
}

export abstract class DynamicNgModule<T> {
  private readonly imports = new Set<ClassType>();
  private readonly providers = new Set<NgModuleProvider>();

  protected addProvider(provider: NgModuleProvider): void {
    this.providers.add(provider);
  }

  protected addImport(module: ClassType): void {
    this.imports.add(module);
  }

  protected abstract process(): void;

  configure(): ModuleWithProviders<T> {
    this.process();

    setNgModuleDef(this.constructor, {
      type: this.constructor,
      imports: [...this.imports],
    });

    setInjectorDef(this.constructor, {
      imports: [...this.imports],
      providers: [...this.providers],
    });

    setFactoryDef(this.constructor, () => this);

    return {
      ngModule: this.constructor as ClassType<T>,
      providers: [],
    };
  }
}
