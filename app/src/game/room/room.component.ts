import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { ServerController } from '@deepular/core';

import type { RoomController } from './room.controller';
import { RoomState } from '../../entities';

@Component({
  selector: 'zeus-room',
  standalone: true,
  imports: [
    RouterOutlet,
    DialogModule,
    FormsModule,
    // new GameModule(),
  ],
  providers: [],
  template: ``
})
export class RoomComponent implements OnInit {
  // private readonly info = this.route.data['info'] as Awaited<ReturnType<RoomController['getInfo']>>;

  constructor(private readonly ctrl: ServerController<RoomController>) {}

  async ngOnInit(): Promise<void> {
    // const room = await this.ctrl.getInfo(this.route.params['id']);
    //
    // if (room.state === RoomState.LOCKED) {
    //
    // }
    //
    // if (room.state === RoomState.PASSWORD) {
    //
    // }
    //
    // if (room.state === RoomState.FULL) {
    //
    // }
  }
}
