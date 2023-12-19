import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';

import type { RoomController } from './room.controller';

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
  private readonly info = this.route.data['info'] as ReturnType<RoomController['getInfo']>;

  constructor(private readonly route: ActivatedRouteSnapshot) {}

  async ngOnInit(): Promise<void> {

  }
}
