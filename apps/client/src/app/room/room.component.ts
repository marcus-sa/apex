import { Component, DestroyRef, Inject, OnInit, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cast, deserialize } from '@deepkit/type';

import { Room, RoomState } from '@apex/api/shared';
import {
  FloorMaterial as ScutiFloorMaterial,
  Room as ScutiRoom,
  WallMaterial as ScutiWallMaterial,
} from '@apex/scuti-renderer';

import { AppComponent } from '../app.component';
import { RoomService } from './room.service';
import { UserService } from '../user';
import { ROOM } from './something';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'apex-room',
  standalone: true,
  providers: [RoomService],
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
    private readonly router: Router,
    @Inject(ROOM)
    protected readonly room$: Observable<Room>,
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

  private async join(id: Room['id']) {
    const room = await this.service.join(id);
    this.render(room);
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async params => {
        const room = await this.service.get(+params['id']);
        // room.users.length === room.capacity
        if (!this.service.isOwner(this.user.me, room)) {
          if (room.state === RoomState.FULL) {
          } else if (room.state === RoomState.LOCKED) {
          } else if (room.state === RoomState.PASSWORD_PROTECTED) {
          }
        }

        await this.join(room.id);
      });
  }
}
