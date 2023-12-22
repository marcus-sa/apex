import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Application } from 'pixi.js';
import { Shroom } from '@jankuss/shroom';

@Component({
  selector: 'apex-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLDivElement>;

  #shroom: Shroom | undefined;
  get shroom(): Shroom {
    if (!this.#shroom) {
      throw new Error('No Shroom instance');
    }
    return this.#shroom
  }

  #pixi: Application | undefined;
  get pixi(): Application {
    if (!this.#pixi) {
      throw new Error('No Pixi application instance');
    }
    return this.#pixi
  }

  async ngOnInit() {
    this.#pixi = new Application();
    await this.#pixi.init();
    this.canvas.nativeElement.appendChild(this.#pixi.canvas);
  }
}
