import { Rectangle, type RectangleOptions } from '../math/Rectangle';
import { Vector } from '../math';
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
  protected source = new Vector();
  protected flipped = false;
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
    return this.visible;
  }

  public getSource(): Vector {
    return this.source;
  }

  public getLayer(): Layer {
    return this.layer;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;
  }

  public update(step: number): void {
    const velocity = new Vector(this.velocity.x, this.velocity.y);
    velocity.multiply(step);

    this.position.add(velocity);
  }

  public destroy(): void {
    return;
  }

  public abstract draw(): void;
}
