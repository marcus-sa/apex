import { Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { Room, RoomState } from '@apex/api/shared';
import {
  FloorMaterial as ScutiFloorMaterial,
  Room as ScutiRoom,
  WallMaterial as ScutiWallMaterial,
} from '@apex/scuti-renderer';

import { JoinRoomOptions } from '@apex/api/server';
import { RoomChatMessageEvent } from '@apex/api/client';

import { AppComponent } from '../app.component';
import { RoomService } from './room.service';
import { UserService } from '../user';
import { PasswordProtectedRoomDialogComponent } from './password-protected-room-dialog.component';
import { RoomController } from './room.controller';

@Component({
  selector: 'apex-room',
  standalone: true,
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  scutiRoom?: ScutiRoom;

  constructor(
    private readonly app: AppComponent,
    private readonly dialog: Dialog,
    private readonly service: RoomService,
    private readonly user: UserService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly destroyRef: DestroyRef,
    private readonly controller: RoomController,
  ) {}

  private render(room: Room) {
    this.scutiRoom = new ScutiRoom({
      heightMap: room.map,
      dragging: true,
      centerCamera: true,
      floorMaterial: new ScutiFloorMaterial(101),
      floorThickness: 8,
      wallMaterial: new ScutiWallMaterial(108),
      wallThickness: 8,
      wallHeight: -1,
    });

    this.app.renderer.add(this.scutiRoom);
  }

  private async join(id: Room['id'], options?: JoinRoomOptions): Promise<Room> {
    const room = await this.service.join(id, options);
    this.render(room);
    return room;
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async params => {
        let room = await this.service.get(+params['id']);
        if (!this.service.isOwner(this.user.me, room)) {
          // room.users.length === room.capacity
          if (room.state === RoomState.FULL) {
          } else if (room.state === RoomState.LOCKED) {
          } else if (room.state === RoomState.PASSWORD_PROTECTED) {
            const dialogRef = this.dialog.open(
              PasswordProtectedRoomDialogComponent,
              {
                data: {
                  room,
                },
              },
            );

            dialogRef.componentInstance!.onSubmit.subscribe(async password => {
              try {
                room = await this.join(room.id, { password });
                dialogRef.componentInstance!.close();
              } catch (err) {
                dialogRef.componentInstance!.error.set(err as Error);
              }
            });
          }
        }
      });

    this.controller.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        switch (true) {
          case event instanceof RoomChatMessageEvent: {
            // TODO
          }
        }
      });
  }
}
