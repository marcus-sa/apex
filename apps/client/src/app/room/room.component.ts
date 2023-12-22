import { Component, OnInit } from '@angular/core';

import { RoomService } from './room.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'apex-room',
  standalone: true,
  providers: [RoomService],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  constructor(private readonly app: AppComponent) {}

  ngOnInit() {}
}
