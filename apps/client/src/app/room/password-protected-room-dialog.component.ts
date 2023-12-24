import { Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { assert } from '@deepkit/type';

import { Room } from '@apex/api/shared';

import { ApexButtonComponent, ApexDialogBodyComponent, ApexDialogTitleComponent, ApexInputComponent } from '../ui';

export interface ApexPasswordProtectedRoomDialogData {
  readonly room: Room;
}

@Component({
  selector: 'apex-password-protected-room-dialog',
  standalone: true,
  template: `
    <div apexDialogBody>
      <apex-dialog-title closeable>{{ data.room.name }}</apex-dialog-title>
      <p class="text-white text-xs">This room is protected with a door code.</p>
      <input apex type="text" />
      <div class="flex justify-between">
        <button apex>Enter</button>
        <button apex>Cancel</button>
      </div>
    </div>
  `,
  imports: [ApexButtonComponent, ApexInputComponent, ApexDialogTitleComponent, ApexDialogBodyComponent],
})
export class PasswordProtectedRoomDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) readonly data: ApexPasswordProtectedRoomDialogData
  ) {
    assert<Room>(data);
  }
}
