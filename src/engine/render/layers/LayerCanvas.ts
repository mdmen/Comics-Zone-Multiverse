import { Logger } from '../../Logger';
import { createCanvas, createContext2D } from '../../utils';
import { Layer, type LayerOptions } from './Layer';
import { type Picture } from '../Picture';
import { Drawable } from '../Drawable';

export class LayerCanvas extends Layer {
  protected node!: HTMLCanvasElement;
  protected context!: CanvasRenderingContext2D;

  constructor(options: LayerOptions) {
    super(options);

    this.onContextChange = this.onContextChange.bind(this);
    this.bindEvents();
  }

  private bindEvents() {
    this.node.addEventListener('contextlost', this.onContextChange);
    this.node.addEventListener('contextrestored', this.onContextChange);
  }

  private onContextChange(event: Event) {
    Logger.error(event);
  }

  protected createNode() {
    const canvas = createCanvas();
    this.context = createContext2D(canvas);

    return canvas;
  }

  protected shouldDraw(drawable: Drawable) {
    return (
      super.shouldDraw(drawable) &&
      drawable.isVisible() &&
      drawable.getOpacity() !== 0
    );
  }

  syncWithCamera() {
    const position = this.camera!.getPosition();
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.context.translate(posX, posY);
  }

  drawImage(image: Picture) {
    const imageSource = image.getImage();

    if (!imageSource || !this.shouldDraw(image)) return;

    const position = image.getPosition();
    const source = image.getSource();
    const width = image.getWidth();
    const height = image.getHeight();
    const opacity = image.getOpacity();
    const color = image.getColor();

    this.context.save();

    if (color) {
      this.context.fillStyle = color;
    }

    if (opacity !== 1) {
      this.context.globalAlpha = opacity;
    }

    this.context.drawImage(
      imageSource.getSource(),
      source.x | 0,
      source.y | 0,
      width | 0,
      height | 0,
      position.x | 0,
      position.y | 0,
      width | 0,
      height | 0
    );

    this.context.restore();
  }

  drawRect(shape: Drawable) {
    if (!this.shouldDraw(shape)) return;

    const position = shape.getPosition();
    const opacity = shape.getOpacity();
    const color = shape.getColor();

    this.context.save();

    if (color) {
      this.context.fillStyle = color;
    }

    if (opacity !== 1) {
      this.context.globalAlpha = opacity;
    }

    this.context.fillRect(
      position.x | 0,
      position.y | 0,
      shape.getWidth() | 0,
      shape.getHeight() | 0
    );

    this.context.restore();
  }

  getNode() {
    return this.node;
  }

  getContext() {
    return this.context;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  destroy() {
    super.destroy();

    this.context = null as unknown as CanvasRenderingContext2D;
  }
}
