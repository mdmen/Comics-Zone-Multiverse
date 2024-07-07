import { CanvasImageNode } from './CanvasImageNode';
import type { Sprite } from '../Sprite';

export class CanvasSpriteNode<T extends Sprite> extends CanvasImageNode<T> {
  protected shouldRedraw() {
    const { frame } = this.drawable.getCurrentFrame();

    return super.shouldRedraw() || !this.sourcePosition.isEqual(frame);
  }

  protected drawImage() {
    const { frame } = this.drawable.getCurrentFrame();

    this.sourcePosition.copy(frame);

    super.drawImage();
  }
}
