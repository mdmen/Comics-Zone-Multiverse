import { CanvasNode } from './CanvasNode';
import type { Text } from '../Text';

export class CanvasTextNode<T extends Text> extends CanvasNode<T> {
  protected text;
  protected fontSize;
  protected color;
  protected shadowColor;

  constructor(drawable: T) {
    super(drawable);

    this.text = drawable.text;
    this.fontSize = drawable.fontSize;
    this.color = drawable.color;
    this.shadowColor = drawable.shadowColor;
  }

  protected shouldRedraw() {
    return (
      super.shouldRedraw() ||
      this.text !== this.drawable.text ||
      this.color !== this.drawable.color ||
      this.fontSize !== this.drawable.fontSize ||
      this.shadowColor !== this.drawable.shadowColor
    );
  }

  private setTextShadow() {
    this.shadowColor = this.drawable.shadowColor;

    this.context.shadowColor = this.shadowColor;
    this.context.shadowOffsetX = this.drawable.shadowOffset.x | 0;
    this.context.shadowOffsetY = this.drawable.shadowOffset.y | 0;
    this.context.shadowBlur = this.drawable.shadowBlur | 0;
  }

  private setColor() {
    this.color = this.drawable.color;
    this.context.fillStyle = this.color;
  }

  protected draw() {
    super.draw();

    this.text = this.drawable.text;

    const fontSize = Math.floor(this.scale * this.fontSize);
    this.context.font = `${fontSize}px ${this.drawable.fontFamily}`;
    this.fontSize = this.drawable.fontSize;

    this.setColor();

    if (this.drawable.shadowColor) {
      this.setTextShadow();
    }

    this.context.fillText(this.text, 0, 0);
  }
}
