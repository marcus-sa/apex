import {
  ɵNG_INJ_DEF,
  ɵNG_MOD_DEF,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
} from '@angular/core';

export const ɵNG_FAC_DEF = 'ɵfac' as const;

export function setInjectorDef(
  type: any,
  def: Parameters<typeof ɵɵdefineInjector>[0],
) {
  type[ɵNG_INJ_DEF] = ɵɵdefineInjector(def);
}

export function setNgModuleDef(
  type: any,
  def: Parameters<typeof ɵɵdefineNgModule>[0],
) {
  type[ɵNG_MOD_DEF] = ɵɵdefineNgModule(def);
}

export function setFactoryDef(type: any, fac: () => any) {
  Object.defineProperty(type, ɵNG_FAC_DEF, {
    configurable: true,
    get: () => fac,
  });
}
