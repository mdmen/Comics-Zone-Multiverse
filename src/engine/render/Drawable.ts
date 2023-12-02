import { Settings } from '../Settings';
import { type LayerDOM } from './layers';
import { type Layer } from './layers/Layer';
import { DrawableNode } from './nodes';
import { Updatable, type UpdatableOptions } from './Updatable';

export interface DrawableOptions extends UpdatableOptions {
  layer: Layer;
  classList?: string[];
}

export abstract class Drawable extends Updatable {
  protected layer;
  protected domNode;
  protected children!: Set<Drawable>;
  protected visible = true;
  protected opacity = 1;

  constructor({ layer, classList = [], ...options }: DrawableOptions) {
    super(options);

    this.layer = layer;
    this.domNode = Settings.isDOMEngine() ? this.createDomNode() : null;

    this.domNode?.getNode().classList.add(...classList);
  }

  centerHorizontally() {
    const x = this.layer.getWidth() / 2 - this.width / 2;
    this.position.x = x;
  }

  getLayer() {
    return this.layer;
  }

  getDomNode() {
    return this.domNode;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  isVisible() {
    return this.visible;
  }

  getOpacity() {
    return this.opacity;
  }

  setOpacity(value: number) {
    if (value < 0 || value > 1) {
      throw Error(`${value} is incorrect opacity value`);
    }

    this.opacity = value;
  }

  draw() {
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
    return new DrawableNode({ layer: this.layer as LayerDOM, drawable: this });
  }
}
