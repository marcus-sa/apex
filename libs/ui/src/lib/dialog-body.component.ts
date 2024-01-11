import { Component, ContentChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { ApexButtonComponent } from './button.component';
import { ApexDialogTitleComponent } from './dialog-title.component';

@Component({
  selector: '[apex-dialog-body]',
  standalone: true,
  exportAs: 'apexDialogBody',
  template: `<ng-content></ng-content>`,
  host: {
    class:
      'w-96 rounded-sm bg-black bg-opacity-[90%] px-5 pb-5 flex gap-4 flex-col',
    '[class.pt-5]': '!title',
  },
  hostDirectives: [CdkDrag],
  imports: [ApexButtonComponent, NgIf, CdkDrag],
})
export class ApexDialogBodyComponent {
  @ContentChild(ApexDialogTitleComponent) title:
    | ApexDialogTitleComponent
    | undefined;
}
