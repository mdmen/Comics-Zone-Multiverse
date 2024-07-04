import { Drawable, type DrawableOptions } from './Drawable';
import type { Rectangle } from '../geometry';

export interface ImageOptions extends DrawableOptions {
  image: HTMLImageElement;
}

export class Image extends Drawable implements Rectangle {
  public readonly image;
  public flipped = false;

  constructor({ image, ...options }: ImageOptions) {
    super(options);

    this.image = image;

    this.size.set(image.clientWidth, image.clientHeight);
  }
}
