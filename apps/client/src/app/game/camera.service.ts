import { Injectable } from '@angular/core';
import { Container, Renderer } from 'pixi.js';

const DEFAULT_ZOOM_LEVEL = 1;

@Injectable({
  providedIn: 'root'
})
export class Camera {
  protected readonly view = new Container();

  constructor(private readonly renderer: Renderer) {
  }
}
