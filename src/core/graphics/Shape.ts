import { Drawable, type DrawableOptions } from './Drawable';

export interface ShapeOptions extends DrawableOptions {
  borderColor?: string;
  color?: string;
  borderWidth?: number;
}

export abstract class Shape extends Drawable {
  public color;
  public borderWidth;
  public borderColor;

  constructor({
    color = '',
    borderWidth = 0,
    borderColor = '',
    ...options
  }: ShapeOptions) {
    super(options);

    this.color = color;
    this.borderWidth = borderWidth;
    this.borderColor = borderColor;
  }
}
