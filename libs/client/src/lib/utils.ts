import {
  ɵNG_INJ_DEF,
  ɵNG_MOD_DEF,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
} from '@angular/core';

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
