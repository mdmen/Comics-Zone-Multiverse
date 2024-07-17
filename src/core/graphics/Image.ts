import { Drawable, type DrawableOptions } from './Drawable';
import { Vector, Shapes } from '../geometry';

export interface ImageOptions extends DrawableOptions {
  image: HTMLImageElement;
}

export class Image extends Drawable {
  public readonly image;
  public readonly source = new Vector(0, 0);
  public flipped = false;

  constructor({ image, ...options }: ImageOptions) {
    super(options);

    this.image = image;
    this.shape = Shapes.RECT;

    this.size.set(image.naturalWidth, image.naturalHeight);
  }
}
