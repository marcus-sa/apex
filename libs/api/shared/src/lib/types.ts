import { float, integer } from '@deepkit/type';

export interface Vector3D {
  readonly x: integer;
  readonly y: integer;
  readonly z: float;
}

export interface Vector2D {
  readonly x: integer;
  readonly y: integer;
}
