import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RpcClient } from '@deepkit/rpc';

import { GameController } from './game.controller';

@Component({
  selector: 'zeus-game',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(readonly client: RpcClient) {}

  ngOnInit() {
    this.client.registerController(GameController, '/game');
  }

  ngOnDestroy() {
    this.client.clientKernel!.controllers.delete('/game');
  }
}
