import type { ClassType } from '@deepkit/core';
import type {
  EnvironmentProviders,
  ModuleWithProviders,
  Provider,
} from '@angular/core';
import { importProvidersFrom } from '@angular/core';

import { setFactoryDef, setInjectorDef, setNgModuleDef } from './utils';

export type NgModuleProvider = Provider | EnvironmentProviders;

export async function importProvidersDynamicallyFrom(
  ...modules: readonly DynamicNgModule<unknown>[]
): Promise<EnvironmentProviders> {
  let configuredModules: readonly ModuleWithProviders<unknown>[] = [];
  for (const module of modules) {
    configuredModules = [...configuredModules, await module.configure()];
  }
  return importProvidersFrom(...configuredModules);
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

  protected abstract process(): Promise<void> | void;

  async configure(): Promise<ModuleWithProviders<T>> {
    await this.process();

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
