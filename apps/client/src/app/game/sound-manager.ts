import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundManager {
  readonly credits = new Audio('/assets/audio/cash_register.mp3');
  readonly pixels = new Audio('/assets/audio/pixels.mp3');
  readonly consoleMessageSent = new Audio('/assets/audio/sent_msg.mp3');
  readonly consoleMessageReceived = new Audio('/assets/audio/tururu.mp3');
}
