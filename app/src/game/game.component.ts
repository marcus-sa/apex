import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameModule } from './game.module';

@Component({
  selector: 'zeus-game',
  standalone: true,
  imports: [
    RouterOutlet,
    // new GameModule(),
  ],
  providers: [],
  template: `
    <router-outlet />
  `
})
export class GameComponent implements OnInit {
  constructor() {
  }

  async ngOnInit(): Promise<void> {

  }
}
