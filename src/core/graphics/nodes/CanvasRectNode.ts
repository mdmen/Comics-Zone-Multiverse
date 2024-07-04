import { CanvasNode } from './CanvasNode';
import type { Rect } from '../Rect';

export class CanvasRectNode<T extends Rect> extends CanvasNode<T> {
  protected color;
  protected borderColor;
  protected borderWidth;

  constructor(drawable: T) {
    super(drawable);

    const { color, borderColor, borderWidth } = drawable;
    this.color = color;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;

    this.draw();
  }

  protected shouldRedraw() {
    return (
      super.shouldRedraw() ||
      this.color !== this.drawable.color ||
      this.borderColor !== this.drawable.borderColor ||
      this.borderWidth !== this.drawable.borderWidth
    );
  }

  private drawStrokedRect() {
    const { borderColor, borderWidth, size } = this.drawable;

    this.borderColor = borderColor;
    this.borderWidth = borderWidth;

    const borderHalfWidth = borderWidth / 2;

    this.context.lineWidth = (borderWidth || 1) | 0;
    this.context.strokeStyle = borderColor || 'black';

    this.context.strokeRect(
      borderHalfWidth | 0,
      borderHalfWidth | 0,
      (size.x - borderHalfWidth) | 0,
      (size.y - borderHalfWidth) | 0
    );
  }

  private drawFilledRect() {
    const { borderWidth, color, size } = this.drawable;

    this.color = color;

    this.context.fillStyle = color;
    this.context.fillRect(
      borderWidth | 0,
      borderWidth | 0,
      (size.x - borderWidth) | 0,
      (size.y - borderWidth) | 0
    );
  }

  protected draw() {
    super.draw();

    if (this.borderColor || this.borderWidth) {
      this.drawStrokedRect();
    }

    if (this.color) {
      this.drawFilledRect();
    }
  }
}
