import { Settings } from '../../Settings';
import { Logger } from '../../Logger';
import { createCanvas, createContext2D } from '../../utils';
import { Layer, type LayerOptions } from './Layer';

export class LayerCanvas extends Layer {
  private context: CanvasRenderingContext2D;

  constructor(options: LayerOptions) {
    super(options);

    this.onContextChange = this.onContextChange.bind(this);
    this.bindEvents();
  }

  private bindEvents(): void {
    this.node.addEventListener('contextlost', this.onContextChange);
    this.node.addEventListener('contextrestored', this.onContextChange);
  }

  private onContextChange(event: Event): void {
    Logger.error(event);
  }

  protected create({ isTransparent }: LayerOptions): HTMLCanvasElement {
    const canvas = createCanvas();
    this.context = createContext2D(canvas, isTransparent);

    return canvas;
  }

  public draw(
    image: HTMLImageElement,
    sx = 0,
    sy = 0,
    width = image.width,
    height = image.height,
    dx = 0,
    dy = 0
  ): void {
    this.context.drawImage(image, sx, sy, width, height, dx, dy, width, height);
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
