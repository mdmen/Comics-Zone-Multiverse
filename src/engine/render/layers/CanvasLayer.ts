import { Logger } from '../../debug/Logger';
import { createCanvas, getContext2D } from '../../utils';
import { Layer, type LayerOptions } from './Layer';

export class CanvasLayer extends Layer {
  private context: CanvasRenderingContext2D;

  constructor(options: LayerOptions) {
    super(options);

    this.onContextLost = this.onContextLost.bind(this);
    this.onContextRestored = this.onContextRestored.bind(this);

    this.bindEvents();
  }

  private bindEvents(): void {
    this.layer.addEventListener('contextlost', this.onContextLost);
    this.layer.addEventListener('contextrestored', this.onContextRestored);
  }

  private onContextLost(event: Event): void {
    Logger.error(event);
  }

  private onContextRestored(event: Event): void {
    Logger.log(event);
  }

  protected create(options: LayerOptions): HTMLCanvasElement {
    const { width, height, isAntialiasing, isTransparent } = options;
    const canvas = createCanvas(width, height);
    this.context = getContext2D(canvas, isTransparent, isAntialiasing);

    return canvas;
  }

  public draw(
    image: HTMLImageElement,
    x = 0,
    y = 0,
    width = image.width,
    height = image.height,
    dx = 0,
    dy = 0,
    dWidth = image.width,
    dHeight = image.height
  ): void {
    this.context.drawImage(image, x, y, width, height, dx, dy, dWidth, dHeight);
  }

  public clear(
    x = 0,
    y = 0,
    width = this.getWidth(),
    height = this.getHeight()
  ): void {
    this.context.clearRect(x, y, width, height);
  }
}
