import { Vector, Shapes } from '../geometry';
import { Shape, type ShapeOptions } from './Shape';

export interface EllipseOptions extends ShapeOptions {
  radiusX?: number;
  radiusY?: number;
}

export class Ellipse extends Shape {
  public readonly radius;

  constructor({ radiusX = 0, radiusY = radiusX, ...options }: EllipseOptions) {
    super(options);

    this.shape = radiusX === radiusY ? Shapes.CIRCLE : Shapes.ELLIPSE;

    this.radius = new Vector(radiusX, radiusY);
    this.size.set(radiusX * 2, radiusY * 2);
  }
}
