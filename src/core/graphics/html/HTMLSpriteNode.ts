import { Vector } from '../../geometry';
import type { Sprite } from '../DrawableSprite';
import { HTMLImageNode } from './HTMLImageNode';

export class HTMLSpriteNode<T extends Sprite> extends HTMLImageNode<T> {
  private readonly bgPosition = new Vector();

  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('sprite-node');

    this.syncBackgroundPosition();
  }

  public syncBackgroundPosition() {
    const source = this.drawable.source;

    this.bgPosition.copy(source);

    this.element.style.setProperty(
      '--node-bg-pos',
      `-${source.x | 0}px -${source.y | 0}px`
    );
  }

  public override update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (!this.bgPosition.isEqual(this.drawable.source)) {
      this.syncBackgroundPosition();
    }
  }
}
