import type { Rectangle } from '../geometry';
import { Drawable, type DrawableOptions } from './Drawable';

export interface RectOptions extends DrawableOptions {
  width?: number;
  height?: number;
  color?: string;
  borderWidth?: number;
  borderColor?: string;
}

export class Rect extends Drawable implements Rectangle {
  public color;
  public borderWidth;
  public borderColor;

  constructor({
    color = '',
    borderWidth = 0,
    borderColor = '',
    width = 0,
    height = 0,
    ...options
  }: RectOptions) {
    super(options);

    this.size.set(width, height);
    this.color = color;
    this.borderWidth = borderWidth;
    this.borderColor = borderColor;
  }
}
