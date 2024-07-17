import { Shapes } from '../geometry';
import { type ShapeOptions, Shape } from './Shape';

interface RectOptions extends ShapeOptions {
  width?: number;
  height?: number;
}

export class Rect extends Shape {
  constructor({ width = 0, height = width, ...options }: RectOptions) {
    super(options);

    this.shape = Shapes.RECT;

    this.size.set(width, height);
  }
}
