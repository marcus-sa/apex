import { Component, OnDestroy, OnInit } from '@angular/core';
import { RpcClient } from '@deepkit/rpc';

import { RoomController } from './room.controller';

@Component({
  selector: 'zeus-room',
  standalone: true,
  providers: [],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit, OnDestroy {
  constructor(readonly client: RpcClient) {}

  ngOnInit() {
    this.client.registerController(RoomController, '/game/room');
  }

  ngOnDestroy() {
    this.client.clientKernel!.controllers.delete('/game/room');
  }
}
