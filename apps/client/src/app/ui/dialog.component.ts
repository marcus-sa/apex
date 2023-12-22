import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { assert } from '@deepkit/type';

export interface ApexDialogData {
  readonly content?: string;
}

@Component({
  selector: 'apex-dialog',
  standalone: true,
  template: `<div>{{ data.content }}</div>`,
})
export class ApexDialogComponent {
  constructor(
    readonly dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) readonly data: ApexDialogData,
  ) {
    assert<ApexDialogData>(data);
  }
}
