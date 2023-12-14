import { Settings } from '../Settings';
import { type LayerDOM } from './layers';
import { type Layer } from './layers/Layer';
import { Node } from './nodes';
import { Updatable, type UpdatableOptions } from './Updatable';

export interface DrawableOptions extends UpdatableOptions {
  layer: Layer;
  color?: string;
  visible?: boolean;
  opacity?: number;
}

export abstract class Drawable extends Updatable {
  protected layer;
  protected domNode: Node | null = null;
  protected children!: Set<Drawable>;

  protected visible;
  protected opacity;
  protected color;

  constructor({
    layer,
    color = '',
    visible = true,
    opacity = 1,
    ...options
  }: DrawableOptions) {
    super(options);

    this.layer = layer;
    this.color = color;
    this.visible = visible;
    this.opacity = opacity;

    if (Settings.isDOMEngine()) {
      this.domNode = this.createDomNode();
    }
  }

  centerHorizontally() {
    const parent = this.parent || this.layer;
    const x = parent.getWidth() / 2 - this.width / 2;
    this.setPosition(x, this.position.y);
  }

  getLayer() {
    return this.layer;
  }

  getDomNode() {
    return this.domNode;
  }

  setPosition(x: number, y: number): void {
    super.setPosition(x, y);

    if (this.domNode) {
      const posX = Math.floor(x);
      const posY = Math.floor(y);

      this.domNode.setStyle(
        'transform',
        `translate3d(${posX}px, ${posY}px, 0)`
      );
    }
  }

  setWidth(width: number) {
    super.setWidth(width);
    this.domNode?.setStyle('width', `${Math.floor(width)}px`);
  }

  setHeight(height: number) {
    super.setHeight(height);
    this.domNode?.setStyle('height', `${Math.floor(height)}px`);
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
    this.domNode?.setStyle('opacity', `${opacity}`);
  }

  getOpacity() {
    return this.opacity;
  }

  setColor(color: string) {
    this.color = color;
    this.domNode?.setStyle('backgroundColor', color);
  }

  getColor() {
    return this.color;
  }

  isVisible() {
    return this.visible;
  }

  hide() {
    this.visible = false;
    this.domNode?.hide();
  }

  show() {
    this.visible = true;
    this.domNode?.show();
  }

  draw() {
    if (this.color) {
      this.layer.drawRect(this);
    }

    this.children.forEach((drawable) => {
      drawable.draw();
    });
  }

  destroy() {
    super.destroy();

    this.layer = null as unknown as Layer;

    this.domNode?.destroy();
    this.domNode = null;
  }

  protected createDomNode() {
    return new Node(this.layer as LayerDOM, this);
  }
}
