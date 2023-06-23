import { Sprite, type SpriteOptions } from './Sprite';

export class SpriteDOM extends Sprite {
  private readonly node;

  constructor(options: SpriteOptions) {
    super(options);

    this.node = this.createNode();
    this.layer.getNode().appendChild(this.node);
  }

  private createNode(): HTMLDivElement {
    const node = document.createElement('div');

    node.style.position = 'absolute';
    !this.visible && (node.style.display = 'hidden');
    node.style.width = `${this.width}px`;
    node.style.height = `${this.height}px`;
    node.style.transform = 'translate3d(0, 0, 0)';
    node.style.backgroundImage = `url(${this.image.src})`;

    return node;
  }

  public show(): void {
    super.show();
    this.node.style.display = 'initial';
  }

  public hide(): void {
    super.hide();
    this.node.style.display = 'hidden';
  }

  public flip(): void {
    super.flip();
    this.node.style.backgroundImage = `url(${this.image.src})`;
  }

  public draw(): void {
    if (!this.isVisible()) return;

    let sourceX = 0;
    let sourceY = 0;

    if (this.animation) {
      const { frame } = this.animation.getCurrentFrame();

      sourceX = -(this.flipped ? this.image.width - frame.x : frame.x);
      sourceY = -frame.y;
    }

    this.layer.draw(
      this.node,
      sourceX,
      sourceY,
      this.width,
      this.height,
      this.position
    );
  }

  public destroy(): void {
    this.node.remove();
  }
}
