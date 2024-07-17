import type { Drawable } from '../Drawable';
import type { HTMLNode } from './HTMLNode';
import { Layer } from '../Layer';

export class HTMLLayer extends Layer {
  public readonly innerElement = this.createInnerLayer();

  protected create() {
    const layer = document.createElement('div');

    layer.appendChild(this.innerElement);

    return layer;
  }

  private createInnerLayer() {
    const layer = document.createElement('div');

    layer.classList.add('inner-layer');

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
