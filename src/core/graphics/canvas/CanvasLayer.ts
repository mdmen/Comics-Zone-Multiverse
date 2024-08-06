import { Logger } from '../../Logger';
import { createCanvas } from '../../utils';
import { Layer, type LayerOptions } from '../Layer';
import type { Drawable } from '../Drawable';
import type { CanvasNode } from './CanvasNode';
import { createContext2D } from './context';

export class CanvasLayer extends Layer {
  protected declare element: HTMLCanvasElement;
  protected context!: CanvasRenderingContext2D;

  constructor(options: LayerOptions) {
    super(options);

    this.onContextChange = this.onContextChange.bind(this);
    this.bindEvents();
  }

  private bindEvents() {
    this.element.addEventListener('contextlost', this.onContextChange);
    this.element.addEventListener('contextrestored', this.onContextChange);
  }

  private onContextChange(event: Event) {
    Logger.error(event);
  }

  protected createNode() {
    const canvas = createCanvas(this.width, this.height);
    this.context = createContext2D(canvas) as CanvasRenderingContext2D;

    return canvas;
  }

  syncWithCamera() {
    if (!this.camera) return;

    const position = this.camera.position;
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.context.translate(posX, posY);
  }

  private shouldDraw(drawable: Drawable) {
    return (
      this.isOnCamera(drawable) &&
      drawable.isGloballyVisible() &&
      drawable.getGlobalOpacity() > 0
    );
  }

  public draw(drawable: Drawable) {
    if (!this.shouldDraw(drawable)) return;

    const node = drawable.node as CanvasNode | null;
    if (!node) return;

    const position = drawable.globalPosition;
    const width = node.canvas.width;
    const height = node.canvas.height;

    const sourceX = position.x < 0 ? -position.x : 0;
    const sourceY = position.y < 0 ? -position.y : 0;
    const rightBound = position.x + width;
    const bottomBound = position.y + height;

    let drawnWidth =
      rightBound > this.width ? width - (rightBound - this.width) : width;
    drawnWidth = (drawnWidth - sourceX) | 0;

    let drawnHeight =
      bottomBound > this.height ? height - (bottomBound - this.height) : height;
    drawnHeight = (drawnHeight - sourceY) | 0;

    this.context.drawImage(
      node.getDrawableElement(),
      sourceX | 0,
      sourceY | 0,
      drawnWidth,
      drawnHeight,
      position.x > 0 ? position.x | 0 : 0,
      position.y > 0 ? position.y | 0 : 0,
      drawnWidth,
      drawnHeight
    );
  }

  public clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
