import { DOMLayer } from '../layers/DOMLayer';
import { Renderable, type RenderableOptions } from './Renderable';

interface SpriteOptions extends RenderableOptions {
  layer: DOMLayer;
  data?: Record<string, unknown>;
}

export class DOMSprite extends Renderable {
  private readonly node;

  constructor(options: SpriteOptions) {
    super(options);

    this.node = this.createNode();
  }

  public show(): void {
    super.show();
    this.node.style.display = 'initial';
  }

  public hide(): void {
    super.hide();
    this.node.style.display = 'hidden';
  }

  private createNode(): HTMLDivElement {
    const node = document.createElement('div');

    node.style.position = 'absolute';
    node.style.display = 'hidden';
    node.style.width = `${this.width}px`;
    node.style.height = `${this.height}px`;
    node.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    node.style.backgroundImage = `url(${this.image.src})`;

    return node;
  }

  public draw(): void {
    void 0;
  }

  public update(): void {
    void 0;
  }
}
