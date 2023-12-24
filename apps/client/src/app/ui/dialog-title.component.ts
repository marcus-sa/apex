import { booleanAttribute, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

import { ApexButtonComponent } from './button.component';
import { ApexIconComponent } from './icon.component';

@Component({
  selector: 'apex-dialog-title',
  standalone: true,
  template: `
    <div class="flex justify-between border-b border-black pb-2 pt-3">
      <div>
        <h2 class="text-sm tracking-wide text-white">
          <ng-content></ng-content>
        </h2>
      </div>
      <div class="absolute left-[92%] top-[5%]">
        <button
          class="!p-0"
          apex
          tabindex="-1"
          *ngIf="closeable"
          (click)="dialogRef.close()"
        >
          <apex-icon type="cross" class="h-5 w-5" />
        </button>
      </div>
    </div>
  `,
  imports: [ApexButtonComponent, NgIf, ApexIconComponent],
})
export class ApexDialogTitleComponent {
  @Input({ transform: booleanAttribute }) closeable: boolean;

  constructor(protected readonly dialogRef: DialogRef) {}
}
