import { CanvasNode } from './CanvasNode';
import type { DrawableImage } from '../DrawableImage';

export class CanvasImageNode<T extends DrawableImage> extends CanvasNode<T> {
  protected flipped = false;

  protected shouldRedraw() {
    return super.shouldRedraw() || this.flipped !== this.drawable.flipped;
  }

  protected drawImage() {
    this.context.drawImage(
      this.drawable.image,
      this.drawable.source.x | 0,
      this.drawable.source.y | 0,
      this.size.width | 0,
      this.size.height | 0,
      0,
      0,
      (this.size.width * this.scale) | 0,
      (this.size.height * this.scale) | 0
    );
  }

  private flipX() {
    this.flipped = this.drawable.flipped;

    const shiftX = Math.floor(this.size.width * this.scale);
    this.context.translate(shiftX, 0);
    this.context.scale(-1, 1);
  }

  protected draw() {
    super.draw();

    if (this.drawable.flipped) {
      this.flipX();
    }

    this.drawImage();
  }
}
