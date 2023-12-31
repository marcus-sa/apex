import { Component, Input } from '@angular/core';
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
  host: {
    '[class]': 'class',
  },
})
export class ApexIconComponent {
  @Input() type: 'cross';

  protected get class() {
    return icon({ type: this.type });
  }
}
