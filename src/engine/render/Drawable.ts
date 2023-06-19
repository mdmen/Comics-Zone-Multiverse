import { Vector } from '../math';
import { getReversedImage } from '../utils';
import type { Layer } from './layers/Layer';

export interface DrawableOptions {
  layer: Layer;
  image: HTMLImageElement;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  canFlip?: boolean;
}

type ImagesType = 'straight' | 'reversed';
type Images = Record<ImagesType, HTMLImageElement>;

export abstract class Drawable {
  protected readonly layer;
  protected image;
  protected images: Images;
  protected position;
  protected width;
  protected height;
  protected velocity;
  protected flipped = false;
  protected visible = true;

  constructor({
    layer,
    image,
    x = 0,
    y = 0,
    width = image.width,
    height = image.height,
    canFlip = false,
  }: DrawableOptions) {
    this.layer = layer;
    this.image = image;
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.width = width;
    this.height = height;

    if (canFlip) {
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

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;
  }

  public abstract destroy(): void;

  public abstract draw(): void;

  public abstract update(deltaStep: number): void;
}
