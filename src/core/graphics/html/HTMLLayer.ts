import type { Drawable } from '../Drawable';
import type { HTMLNode } from './HTMLNode';
import { Layer } from '../Layer';
import { HTMLCustomElement } from './HTMLCustomElement';

import './styles.css';

export class HTMLLayer extends Layer {
  public readonly innerElement = this.createInnerLayer();

  public static readonly TAG_NAME = 'g-layer';
  public static readonly INNER_TAG_NAME = 'g-inner-layer';

  static {
    HTMLCustomElement.define(HTMLLayer.TAG_NAME);
    HTMLCustomElement.define(HTMLLayer.INNER_TAG_NAME);
  }

  protected create() {
    const layer = document.createElement(HTMLLayer.TAG_NAME);

    layer.appendChild(this.innerElement);

    return layer;
  }

  private createInnerLayer() {
    const layer = document.createElement(HTMLLayer.INNER_TAG_NAME);

    layer.classList.add('g-inner-layer');

    return layer;
  }

  syncWithCamera() {
    if (!this.camera) return;

    const position = this.camera.position;
    const x = -Math.floor(position.x);
    const y = -Math.floor(position.y);

    this.innerElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  public draw(drawable: Drawable) {
    const node = drawable.node as HTMLNode;

    if (!this.isOnCamera(drawable)) {
      node.isMounted() && node.unmount();
      return;
    }

    !node.isMounted() && node.mount();

    node.update();
  }

  clear() {}
}
