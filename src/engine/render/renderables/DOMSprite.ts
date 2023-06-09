import { Renderable } from './Renderable';
import type { SpriteOptions } from './types';

export class DOMSprite extends Renderable {
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
    node.style.backgroundImage = `url(${this.image.src})`;

    return node;
  }

  public destroy(): void {
    super.destroy();
    this.layer.getNode().removeChild(this.node);
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
    return;
  }

  public update(): void {
    return;
  }
}
