import { cva } from 'class-variance-authority';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { ApexIconComponent } from './icon.component';

const button = cva(
  [
    'text-white',
    'text-xs',
    'rounded-sm',
    'px-4',
    'py-1.5',
    'min-w-20',
    'flex',
    'justify-center',
    'content-center',
    'tracking-wide',
  ],
  {
    variants: {
      intent: {
        primary: [
          'hover:bg-[#393839]',
          'hover:bg-[#4c4a4b]',
          'bg-[#282729]',
          'border-t',
          'shadow-sm',
          'border-[#3d3c3d]',
          'hover:border-[#4b4a4b]',
        ],
      },
    },
  },
);

@Component({
  selector: 'button[apex-button], apex-icon[apex-button]',
  exportAs: 'apexButton',
  standalone: true,
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApexButtonComponent {
  @Input() intent: 'primary' = 'primary';

  @ContentChild(ApexIconComponent) icon: ApexIconComponent | undefined;

  @HostBinding('class')
  get class(): string {
    return button({ intent: this.intent });
  }
}
