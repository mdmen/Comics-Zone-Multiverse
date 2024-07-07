import { CanvasNode } from './CanvasNode';
import type { Image } from '../../Image';
import { Vector } from '../../../geometry';

export class CanvasImageNode<T extends Image> extends CanvasNode<T> {
  protected flipped = false;
  protected readonly sourcePosition = new Vector(0, 0);

  protected shouldRedraw() {
    return super.shouldRedraw() || this.flipped !== this.drawable.flipped;
  }

  protected drawImage() {
    this.context.drawImage(
      this.drawable.image,
      this.sourcePosition.x | 0,
      this.sourcePosition.y | 0,
      this.size.x | 0,
      this.size.y | 0,
      0,
      0,
      (this.size.x * this.scale) | 0,
      (this.size.y * this.scale) | 0
    );
  }

  private flipX() {
    this.flipped = this.drawable.flipped;

    this.context.translate(this.size.x, 0);
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
