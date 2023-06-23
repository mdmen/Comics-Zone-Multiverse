import { Vector } from '../math';

export interface RectangleOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class Rectangle {
  protected position;
  protected width;
  protected height;

  constructor({ x = 0, y = 0, width = 0, height = 0 }: RectangleOptions) {
    this.position = new Vector(x, y);
    this.width = width;
    this.height = height;
  }

  public getPosition(): Vector {
    return this.position;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}
