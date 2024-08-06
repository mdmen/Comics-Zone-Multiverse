import { Entity, type RectEntityOptions } from './Entity';
import { type Layer, DrawableImage } from '../graphics';

export interface ImageEntityOptions extends Omit<RectEntityOptions, 'size'> {
  layer: Layer;
  image: HTMLImageElement;
}

export class ImageEntity extends Entity {
  constructor({ layer, image, ...options }: ImageEntityOptions) {
    super(options);

    if (!image.complete) {
      throw Error(`Image "${image.src}" is not loaded`);
    }

    this.size.set(image.naturalWidth, image.naturalHeight);
    this.drawable = new DrawableImage({ entity: this, layer, image });
  }
}
