import { getReversedImage } from '../utils';
import type { LayerBase } from './layers/LayerBase';

export interface RenderableOptions {
  layer: LayerBase;
  image: HTMLImageElement;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  selfClear?: boolean;
  canFlip?: boolean;
}

type ImagesType = 'straight' | 'reversed';
type Images = Record<ImagesType, HTMLImageElement>;

export abstract class Renderable {
  protected readonly layer;
  protected image;
  protected images: Images;
  protected x;
  protected y;
  protected width;
  protected height;
  private visible;
  private dirty;
  protected flipped;

  constructor({
    layer,
    image,
    x = 0,
    y = 0,
    width = image.width,
    height = image.height,
    canFlip = false,
  }: RenderableOptions) {
    this.layer = layer;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.visible = true;
    this.dirty = true;
    this.flipped = false;

    if (canFlip) {
      this.images = {
        straight: image,
        reversed: getReversedImage(image),
      };
    }
  }

  protected shouldDraw(): boolean {
    return this.isVisible() && this.isDirty();
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

  public setDirty(): void {
    this.dirty = true;
  }

  public isDirty(): boolean {
    return this.dirty;
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;

    this.setDirty();
  }

  public destroy(): void {
    return;
  }

  public abstract draw(): void;

  public abstract update(timeStamp: number): void;
}
