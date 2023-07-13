import { type Updatable } from '../Updatable';
import { type LayerDOM } from '../layers/LayerDOM';
import { Node } from './Node';

export interface DrawableNodeOptions {
  layer: LayerDOM;
  drawable: Updatable;
  bgColor?: string;
}

export class DrawableNode extends Node {
  protected readonly layer;
  protected drawable;
  protected bgColor;

  constructor({ layer, drawable, bgColor }: DrawableNodeOptions) {
    super();

    this.layer = layer;
    this.drawable = drawable;
    this.bgColor = bgColor;

    this.node = this.create();
    this.mount();
  }

  protected create(): HTMLElement {
    const node = document.createElement('div');
    const position = this.drawable.getPosition();
    const posX = Math.floor(position.x);
    const posY = Math.floor(position.y);

    node.style.position = 'absolute';
    !this.drawable.isVisible() && (node.hidden = true);
    this.bgColor && (node.style.backgroundColor = this.bgColor);
    node.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    node.style.width = `${Math.floor(this.drawable.getWidth())}px`;
    node.style.height = `${Math.floor(this.drawable.getHeight())}px`;

    return node;
  }

  public mount(): void {
    const subnode = this.layer.getSubnode();

    if (subnode.contains(this.node)) return;

    subnode.append(this.node);
  }
}
