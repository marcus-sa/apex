import { booleanAttribute, Component, Input } from '@angular/core';
import { ApexButtonComponent } from './button.component';
import { NgIf } from '@angular/common';
import { ApexIconComponent } from './icon.component';

@Component({
  selector: 'apex-dialog-title',
  standalone: true,
  template: `
    <div class="flex justify-between border-b border-black pt-3 pb-2">
        <div>
            <h2 class="text-white tracking-wide text-sm"><ng-content></ng-content></h2>
        </div>
        <div class="absolute left-[92%] top-[5%]">
            <button class="!p-0" apex tabindex="-1" *ngIf="closeable">
                <apex-icon type="cross" class="w-5 h-5" />
            </button>
        </div>
    </div>
  `,
  imports: [ApexButtonComponent, NgIf, ApexIconComponent],
})
export class ApexDialogTitleComponent {
  @Input({ transform: booleanAttribute }) closeable: boolean;
}
