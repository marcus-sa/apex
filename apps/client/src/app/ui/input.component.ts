import { Component } from '@angular/core';

@Component({
  selector: 'input[apex]',
  exportAs: 'apexInput',
  standalone: true,
  template: ``,
  host: {
    class: 'h-7 text-xs w-full rounded-sm text-black px-2 inner-shadow border-none focus:outline-none'
  }
})
export class ApexInputComponent {}
