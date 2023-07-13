import { Logger } from '../../Logger';
import { createCanvas, createContext2D } from '../../utils';
import { Layer, type LayerOptions } from './Layer';
import { type Image } from '../Image';
import { type RectShape } from '../RectShape';

interface LayerCanvasOptions extends LayerOptions {
  transparent?: boolean;
}

export class LayerCanvas extends Layer {
  private context!: CanvasRenderingContext2D;
  private transparent;

  constructor({ transparent, ...options }: LayerCanvasOptions) {
    super(options);

    this.transparent = transparent;

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

  public drawImage(image: Image): void {
    if (!this.shouldDraw(image)) return;

    const position = image.getPosition();
    const source = image.getSource();
    const width = image.getWidth();
    const height = image.getHeight();

    this.context.drawImage(
      image.getImage(),
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

  public drawRect(shape: RectShape): void {
    this.context.save();
    this.context.fillStyle = shape.getColor();

    const position = shape.getPosition();
    this.context.fillRect(
      Math.floor(position.x),
      Math.floor(position.y),
      Math.floor(shape.getWidth()),
      Math.floor(shape.getHeight())
    );

    this.context.restore();
  }
}
