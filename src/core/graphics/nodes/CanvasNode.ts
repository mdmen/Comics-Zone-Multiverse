import { Vector } from '../../geometry';
import { createCanvas, createContext2D, toRadians } from '../../utils';
import { Drawable } from '../Drawable';

export abstract class CanvasNode<T extends Drawable> {
  public readonly canvas;
  public readonly context;
  protected readonly drawable;
  protected readonly size = new Vector();
  protected opacity;
  protected rotation;
  protected scale;

  constructor(drawable: T) {
    this.drawable = drawable;
    this.canvas = createCanvas(0, 0);
    this.context = createContext2D(this.canvas);

    this.scale = drawable.scale;
    this.rotation = drawable.rotation;
    this.opacity = drawable.opacity;
    this.size.copy(drawable.size);

    this.setCanvasSize();
  }

  protected shouldRedraw() {
    return (
      !this.size.isEqual(this.drawable.size) ||
      this.opacity !== this.drawable.getFullOpacity() ||
      this.scale !== this.drawable.scale ||
      this.rotation !== this.drawable.rotation
    );
  }

  private setOpacity(opacity: number) {
    this.opacity = opacity;

    this.context.globalAlpha = this.opacity;
  }

  private setRotation() {
    this.rotation = this.drawable.rotation;

    this.context.rotate(toRadians(this.rotation));
  }

  private setCanvasSize() {
    this.canvas.width = Math.floor(this.scale * this.size.x);
    this.canvas.height = Math.floor(this.scale * this.size.y);
  }

  private setSize() {
    this.size.copy(this.drawable.size);

    this.setCanvasSize();
  }

  private setScale() {
    this.scale = this.drawable.scale;

    this.setCanvasSize();
  }

  protected draw() {
    const opacity = this.drawable.getFullOpacity();
    if (opacity < 1) {
      this.setOpacity(opacity);
    }

    if (this.rotation) {
      this.setRotation();
    }
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getDrawableNode() {
    if (!this.shouldRedraw()) {
      return this.canvas;
    }

    this.clear();

    if (this.scale !== this.drawable.scale) {
      this.setScale();
    }

    if (!this.size.isEqual(this.drawable.size)) {
      this.setSize();
    }

    this.context.save();
    this.draw();
    this.context.restore();

    return this.canvas;
  }
}
