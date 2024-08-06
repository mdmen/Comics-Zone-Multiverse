import { CanvasNode } from './CanvasNode';
import type { DrawableRect } from '../DrawableRect';

export class CanvasRectNode<T extends DrawableRect> extends CanvasNode<T> {
  protected color;
  protected borderColor;
  protected borderWidth;

  constructor(drawable: T) {
    super(drawable);

    this.color = drawable.color;
    this.borderColor = drawable.borderColor;
    this.borderWidth = drawable.borderWidth;
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
      (size.width - borderHalfWidth) | 0,
      (size.height - borderHalfWidth) | 0
    );
  }

  private drawFilledRect() {
    const { borderWidth, color, size } = this.drawable;

    this.color = color;

    this.context.fillStyle = color;
    this.context.fillRect(
      borderWidth | 0,
      borderWidth | 0,
      (size.width - borderWidth) | 0,
      (size.height - borderWidth) | 0
    );
  }

  protected draw() {
    super.draw();

    if (this.drawable.borderColor || this.drawable.borderWidth) {
      this.drawStrokedRect();
    }

    if (this.drawable.color) {
      this.drawFilledRect();
    }
  }
}
