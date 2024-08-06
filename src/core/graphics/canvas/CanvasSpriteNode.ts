import { CanvasImageNode } from './CanvasImageNode';
import type { Sprite } from '../DrawableSprite';
import { Vector } from '../../geometry';

export class CanvasSpriteNode<T extends Sprite> extends CanvasImageNode<T> {
  protected readonly sourcePosition = new Vector(0, 0);

  constructor(drawable: T) {
    super(drawable);

    this.sourcePosition.copy(this.drawable.source);
  }

  protected shouldRedraw() {
    return (
      super.shouldRedraw() || !this.sourcePosition.isEqual(this.drawable.source)
    );
  }

  protected drawImage() {
    this.sourcePosition.copy(this.drawable.source);

    super.drawImage();
  }
}
