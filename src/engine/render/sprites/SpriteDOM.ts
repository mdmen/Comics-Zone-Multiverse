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
    !this.visible && (node.hidden = true);
    node.style.width = `${this.width}px`;
    node.style.height = `${this.height}px`;
    node.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    node.style.backgroundImage = `url(${this.image.src})`;

    return node;
  }

  public getNode(): HTMLDivElement {
    return this.node;
  }

  public show(): void {
    super.show();
    this.node.hidden = false;
  }

  public hide(): void {
    super.hide();
    this.node.hidden = true;
  }

  public flip(): void {
    super.flip();
    this.node.style.backgroundImage = `url(${this.image.src})`;
  }

  public destroy(): void {
    this.node.remove();
  }
}
