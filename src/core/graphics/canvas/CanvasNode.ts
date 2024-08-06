import { createCanvas } from '../../utils';
import { Drawable } from '../Drawable';
import { createContext2D } from './context';

export abstract class CanvasNode<T extends Drawable = Drawable> {
  public readonly canvas;
  public readonly context;
  protected readonly drawable;
  protected readonly size;
  protected opacity;
  protected scale;
  private blank = true;

  constructor(drawable: T) {
    this.drawable = drawable;
    this.opacity = drawable.getGlobalOpacity();
    this.scale = drawable.scale;
    this.size = drawable.size.clone();

    this.canvas = createCanvas(
      this.scale * this.size.width,
      this.scale * this.size.height,
      true
    );
    this.context = createContext2D(this.canvas);
  }

  protected shouldRedraw() {
    return (
      this.blank ||
      !this.size.isEqual(this.drawable.size) ||
      this.opacity !== this.drawable.getGlobalOpacity() ||
      this.scale !== this.drawable.scale
    );
  }

  private setOpacity(opacity: number) {
    this.opacity = opacity;

    this.context.globalAlpha = this.opacity;
  }

  private setCanvasSize() {
    this.canvas.width = Math.floor(this.scale * this.size.width);
    this.canvas.height = Math.floor(this.scale * this.size.height);
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
    this.blank &&= false;

    const opacity = this.drawable.getGlobalOpacity();
    if (opacity < 1) {
      this.setOpacity(opacity);
    }
  }

  private clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public getDrawableElement() {
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
