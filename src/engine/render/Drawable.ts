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
  protected x;
  protected y;
  protected width;
  protected height;
  private visible = true;
  protected flipped = false;

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
    this.x = x;
    this.y = y;
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

  public isVisible(): boolean {
    return this.visible;
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;
  }

  public destroy(): void {
    return;
  }

  public abstract draw(): void;

  public abstract update(timeStamp: number): void;
}
