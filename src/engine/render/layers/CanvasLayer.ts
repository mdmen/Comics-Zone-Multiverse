import { Settings } from '@/engine/Settings';
import { Logger } from '../../debug/Logger';
import { createCanvas, getContext2D } from '../../utils';
import { BaseLayer, type LayerOptions } from './BaseLayer';

export class CanvasLayer extends BaseLayer {
  private context: CanvasRenderingContext2D;

  constructor(options: LayerOptions) {
    super(options);

    this.onContextLost = this.onContextLost.bind(this);
    this.onContextRestored = this.onContextRestored.bind(this);

    this.bindEvents();
  }

  private bindEvents(): void {
    this.node.addEventListener('contextlost', this.onContextLost);
    this.node.addEventListener('contextrestored', this.onContextRestored);
  }

  private onContextLost(event: Event): void {
    Logger.error(event);
  }

  private onContextRestored(event: Event): void {
    Logger.log(event);
  }

  protected create({ isTransparent }: LayerOptions): HTMLCanvasElement {
    const canvas = createCanvas(
      Settings.getValue('canvasWidth'),
      Settings.getValue('canvasHeight')
    );
    this.context = getContext2D(canvas, isTransparent);

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
    dWidth = this.getWidth(),
    dHeight = this.getHeight()
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
