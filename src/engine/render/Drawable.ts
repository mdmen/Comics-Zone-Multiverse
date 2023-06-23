import { Rectangle, type RectangleOptions } from '../math/Rectangle';
import { Vector, isRectanglesCollide } from '../math';
import { getReversedImage } from '../utils';
import type { Layer } from './layers/Layer';

export interface DrawableOptions extends RectangleOptions {
  layer: Layer;
  image: HTMLImageElement;
  flippable?: boolean;
}

type ImagesType = 'straight' | 'reversed';
type Images = Record<ImagesType, HTMLImageElement>;

export abstract class Drawable extends Rectangle {
  protected readonly layer;
  protected image;
  protected images: Images;
  protected velocity = new Vector();
  protected flipped = true;
  protected visible = true;

  constructor({
    layer,
    image,
    flippable = false,
    ...options
  }: DrawableOptions) {
    super(options);

    const { width = image.width, height = image.height } = options;
    this.width = width;
    this.height = height;

    this.layer = layer;
    this.image = image;

    if (flippable) {
      this.images = {
        straight: image,
        reversed: getReversedImage(image),
      };
    }
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public isVisible(): boolean {
    return this.visible && isRectanglesCollide(this, this.layer);
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;
  }

  public abstract destroy(): void;

  public abstract draw(): void;

  public abstract update(): void;
}
