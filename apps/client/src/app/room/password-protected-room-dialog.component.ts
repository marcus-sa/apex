import { Component, Inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { assert } from '@deepkit/type';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { NgIf } from '@angular/common';

import { InvalidRoomPasswordError, Room } from '@apex/api/shared';
import {
  ApexButtonComponent,
  ApexDialogBodyComponent,
  ApexDialogTitleComponent,
  ApexInputComponent,
} from '@apex/ui';

export interface ApexPasswordProtectedRoomDialogData {
  readonly room: Room;
}

@Component({
  selector: 'apex-password-protected-room-dialog',
  standalone: true,
  template: `
    <div apex-dialog-body [class.animation-shake]="error()">
      <apex-dialog-title closeable>{{ data.room.name }}</apex-dialog-title>
      <p class="text-xs text-white">This room is protected with a door code.</p>
      <input
        apex-input
        type="text"
        [class.border]="error()"
        [class.border-red-700]="error()"
        [(ngModel)]="password"
        (keydown)="error.set(null)"
      />
      <span class="text-red-700" *ngIf="isInvalidDoorCodeError(error())">
        Invalid door code
      </span>
      <p class="text-red-700" *ngIf="isUnknownError(error())">
        An unknown error occurred:
        {{ error()?.['message'] }};
      </p>
      <div class="flex justify-between">
        <button apex-button (click)="submit()">Enter</button>
        <button apex-button (click)="close()">Cancel</button>
      </div>
    </div>
  `,
  imports: [
    ApexButtonComponent,
    ApexInputComponent,
    ApexDialogTitleComponent,
    ApexDialogBodyComponent,
    FormsModule,
    NgIf,
  ],
})
export class PasswordProtectedRoomDialogComponent {
  protected password: string;

  readonly error = signal<InvalidRoomPasswordError | Error | null>(null);

  readonly #onSubmit = new Subject<string>();

  get onSubmit(): Observable<string> {
    return this.#onSubmit.asObservable();
  }

  constructor(
    protected readonly dialogRef: DialogRef,
    @Inject(DIALOG_DATA)
    protected readonly data: ApexPasswordProtectedRoomDialogData,
  ) {
    assert<Room>(data);

    dialogRef.closed.subscribe(() => {
      this.#onSubmit.complete();
    });
  }

  protected isInvalidDoorCodeError(
    error: unknown,
  ): error is InvalidRoomPasswordError {
    return error instanceof InvalidRoomPasswordError;
  }

  protected isUnknownError(error: unknown): error is Error {
    return error instanceof Error;
  }

  protected submit(): void {
    this.#onSubmit.next(this.password);
  }

  close(): void {
    this.dialogRef.close();
  }
}
