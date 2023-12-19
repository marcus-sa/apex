import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'zeus-game',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
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
