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
    !this.isVisible() && (node.style.display = 'hidden');
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

    const { frame, offset } = this.animation.getCurrentFrame();
    const offsetX = offset?.x || 0;
    const offsetY = offset?.y || 0;

    this.layer.draw(
      this.node,
      this.flipped ? -(this.image.width - frame.x) : -frame.x,
      this.flipped ? -(this.image.height - frame.y) : -frame.y,
      this.width,
      this.height,
      this.flipped ? this.x + offsetX : -this.x + offsetX,
      this.flipped ? this.y + offsetY : -this.y + offsetY
    );
  }

  public update(timeStamp: number): void {
    super.update(timeStamp);
  }

  public destroy(): void {
    super.destroy();
    this.layer.getNode().removeChild(this.node);
  }
}
