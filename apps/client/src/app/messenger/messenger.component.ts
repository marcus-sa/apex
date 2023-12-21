import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MessengerService } from './messenger.service';

@Component({
  selector: 'apex-messenger',
  standalone: true,
  imports: [RouterOutlet],
  providers: [MessengerService],
  templateUrl: './messenger.component.html',
})
export class MessengerComponent {}
