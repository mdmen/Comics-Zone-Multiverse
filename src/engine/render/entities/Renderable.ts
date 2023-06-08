import type { Layer } from '../layers/Layer';

export interface RenderableOptions {
  layer: Layer;
  image: HTMLImageElement;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class Renderable {
  protected readonly layer;
  protected readonly image;
  protected x;
  protected y;
  protected width;
  protected height;
  protected visible;
  protected dirty;

  constructor({
    layer,
    image,
    x = 0,
    y = 0,
    width = image.width,
    height = image.height,
  }: RenderableOptions) {
    this.layer = layer;
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.visible = false;
    this.dirty = false;
  }

  public hide(): void {
    this.visible = false;
  }

  public show(): void {
    this.visible = true;
  }

  public abstract draw(): void;

  public abstract update(): void;
}
