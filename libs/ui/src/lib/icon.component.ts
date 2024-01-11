import { Component, HostBinding, Input } from '@angular/core';
import { cva } from 'class-variance-authority';

const icon = cva(['h-5', 'w-5'], {
  variants: {
    type: {
      cross: 'icon-[iconoir--xmark]',
    },
  },
});

@Component({
  selector: 'apex-icon',
  standalone: true,
  template: ``,
})
export class ApexIconComponent {
  @Input() type: 'cross';

  @HostBinding('class')
  get class(): string {
    return icon({ type: this.type });
  }
}
