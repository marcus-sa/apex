import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'apex-game',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './game.component.html',
})
export class GameComponent {}
