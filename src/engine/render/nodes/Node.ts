import { type Drawable } from '../Drawable';
import { type LayerDOM } from '../layers';

type AllowedProps =
  | 'zIndex'
  | 'position'
  | 'width'
  | 'height'
  | 'transform'
  | 'overflow'
  | 'opacity'
  | 'backgroundColor';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export class Node {
  protected layer;
  protected drawable;
  protected node;

  constructor(layer: LayerDOM, drawable: Drawable) {
    this.layer = layer;
    this.drawable = drawable;
    this.node = this.create();

    this.mount();
  }

  protected create() {
    const node = document.createElement('div');
    const position = this.drawable.getPosition();
    const posX = Math.floor(position.x);
    const posY = Math.floor(position.y);
    const color = this.drawable.getColor();

    node.style.position = 'absolute';
    !this.drawable.isVisible() && (node.hidden = true);
    !!color && (node.style.backgroundColor = color);
    node.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    node.style.width = `${Math.floor(this.drawable.getWidth())}px`;
    node.style.height = `${Math.floor(this.drawable.getHeight())}px`;

    return node;
  }

  setStyle<Rules extends keyof Styles>(name: Rules, value: Styles[Rules]) {
    this.node.style[name] = value;
  }

  mount() {
    const subLayer = this.layer.getSubnode();

    if (subLayer.contains(this.node)) return;

    subLayer.append(this.node);
  }

  addClassNames(...classNames: string[]) {
    this.node.classList.add(...classNames.filter(Boolean));
  }

  removeClassNames(...classNames: string[]) {
    this.node.classList.remove(...classNames.filter(Boolean));
  }

  show() {
    this.node.hidden = false;
  }

  hide() {
    this.node.hidden = true;
  }

  getNode() {
    return this.node;
  }

  destroy() {
    this.node.remove();
    this.node = null as unknown as HTMLDivElement;
    this.layer = null as unknown as LayerDOM;
    this.drawable = null as unknown as Drawable;
  }
}
