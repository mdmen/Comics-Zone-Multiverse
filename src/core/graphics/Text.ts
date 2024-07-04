import { Drawable, type DrawableOptions } from './Drawable';

export interface TextOptions extends DrawableOptions {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  shadowColor?: string;
  maxWidth?: number;
  centered?: boolean;
}

export class Text extends Drawable {
  public text;
  public readonly fontFamily;
  public fontSize;

  constructor({
    text,
    fontSize = 16,
    fontFamily = 'sans-serif',
    ...options
  }: TextOptions) {
    super(options);

    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }
}
