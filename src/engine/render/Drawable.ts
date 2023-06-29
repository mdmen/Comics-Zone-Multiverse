import { Rectangle } from '../math/Rectangle';
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
    x,
    y,
    layer,
    image,
    width = image.width,
    height = image.height,
    flippable = false,
  }: DrawableOptions) {
    super(x, y, width, height);

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

  public setVelocity(x: number, y: number): void {
    this.velocity.set(x, y);
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;
  }

  public update(step: number): void {
    const velocity = new Vector(this.velocity.x, this.velocity.y);
    velocity.scale(step);

    this.position.add(velocity);
  }

  public destroy(): void {
    return;
  }

  public abstract draw(): void;
}
