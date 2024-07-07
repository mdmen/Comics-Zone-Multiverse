import { Vector } from '../../geometry';
import { Sprite } from '../Sprite';
import { HTMLImageNode } from './HTMLImageNode';

export class HTMLSpriteNode extends HTMLImageNode {
  protected declare readonly drawable: Sprite;
  private bgPosition = new Vector();

  constructor(drawable: Sprite) {
    super(drawable);

    this.element.classList.add('sprite-node');

    this.syncBackgroundPosition();
  }

  public syncBackgroundPosition() {
    const { frame } = this.drawable.getCurrentFrame();

    this.bgPosition.copy(frame);

    this.element.style.setProperty(
      '--node-bg-pos',
      `-${frame.x | 0}px -${frame.y}px`
    );
  }

  public update() {
    super.update();

    if (!this.visible || this.opacity === 0) return;

    const { frame } = this.drawable.getCurrentFrame();
    !this.bgPosition.isEqual(frame) && this.syncBackgroundPosition();
  }
}
