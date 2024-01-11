import { Component } from '@angular/core';

@Component({
  selector: 'input[apex-input]',
  exportAs: 'apexInput',
  standalone: true,
  template: ``,
  host: {
    class:
      'h-7 text-xs w-full rounded-sm text-black px-2 shadow-inner focus:outline-none',
  },
})
export class ApexInputComponent {}
