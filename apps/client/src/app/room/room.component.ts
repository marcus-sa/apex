import { Component } from '@angular/core';

import { RoomService } from './room.service';

@Component({
  selector: 'apex-room',
  standalone: true,
  providers: [RoomService],
  templateUrl: './room.component.html',
})
export class RoomComponent {}
