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
    const canvas = createCanvas(
      Settings.getValue('canvasWidth'),
      Settings.getValue('canvasHeight')
    );
    this.context = createContext2D(canvas, isTransparent);

    const isAntialiasing = Settings.getValue('antialiasing');
    this.context.imageSmoothingEnabled = isAntialiasing;
    !isAntialiasing && (this.context.textRendering = 'optimizeSpeed');

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
