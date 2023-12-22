import { AfterViewInit, Component } from '@angular/core';

import { FloorMaterial, Room, WallMaterial } from '@apex/scuti-renderer';

import { AppComponent } from '../app.component';
import { RoomService } from './room.service';

@Component({
  selector: 'apex-room',
  standalone: true,
  providers: [RoomService],
  templateUrl: './room.component.html',
})
export class RoomComponent implements AfterViewInit {
  constructor(private readonly app: AppComponent) {}

  ngAfterViewInit() {
    const heightMap = `
      xxxxxxxxxxxxx
      x000000000000
      x000000000000
      x000000000000
      x000000000000
      x000000000000
      x000000000000
      x000000000000
    `;

    const room = new Room({
      heightMap: heightMap,
      dragging: true,
      centerCamera: true,
      floorMaterial: new FloorMaterial(101),
      floorThickness: 8,
      wallMaterial: new WallMaterial(108),
      wallThickness: 8,
      wallHeight: -1,
    });

    this.app.renderer.add(room);
  }
}
