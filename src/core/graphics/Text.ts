import { Vector } from '../geometry';
import { Drawable, type DrawableOptions } from './Drawable';

export interface TextOptions extends DrawableOptions {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  maxWidth?: number;
}

export class Text extends Drawable {
  public text;
  public readonly fontFamily;
  public fontSize;
  public maxWidth;
  public color;
  public shadowColor;
  public readonly shadowBlur;
  public readonly shadowOffset;

  public static readonly MAX_WIDTH = 1000;

  constructor({
    text,
    fontSize = 16,
    fontFamily = 'sans-serif',
    maxWidth = 0,
    color = 'black',
    shadowColor = '',
    shadowOffsetX = 0,
    shadowOffsetY = 0,
    shadowBlur = 0,
    ...options
  }: TextOptions) {
    super(options);

    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.maxWidth = maxWidth;
    this.color = color;
    this.shadowColor = shadowColor;
    this.shadowOffset = new Vector(shadowOffsetX, shadowOffsetY);
    this.shadowBlur = shadowBlur;
  }
}
