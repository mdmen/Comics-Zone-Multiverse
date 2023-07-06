import { Logger } from '../../Logger';
import { createCanvas, createContext2D } from '../../utils';
import { Layer, type LayerOptions } from './Layer';
import type { Drawable } from '../Drawable';

export class LayerCanvas extends Layer {
  private context!: CanvasRenderingContext2D;

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

  protected create(): HTMLCanvasElement {
    const canvas = createCanvas();
    this.context = createContext2D(canvas, this.transparent);

    return canvas;
  }

  protected syncWithCamera(): void {
    const position = this.camera!.getPosition();
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.context.translate(posX, posY);
  }

  public preDraw(): void {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.save();

    super.preDraw();
  }

  public draw(drawable: Drawable): void {
    if (!this.shouldDraw(drawable)) return;

    const position = drawable.getPosition();
    const source = drawable.getSource();
    const width = drawable.getWidth();
    const height = drawable.getHeight();

    this.context.drawImage(
      drawable.getImage(),
      source.x,
      source.y,
      width,
      height,
      Math.floor(position.x),
      Math.floor(position.y),
      Math.floor(width),
      Math.floor(height)
    );
  }

  public postDraw(): void {
    this.context.restore();
  }
}
