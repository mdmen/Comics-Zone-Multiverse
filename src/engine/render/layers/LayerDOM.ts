import { Layer } from './Layer';

export class LayerDOM extends Layer {
  protected node!: HTMLDivElement;
  protected subnode!: HTMLDivElement;

  protected createNode() {
    const layer = document.createElement('div');

    this.subnode = this.createSubLayer();
    layer.appendChild(this.subnode);

    return layer;
  }

  private createSubLayer() {
    const layer = document.createElement('div');

    layer.style.position = 'absolute';
    layer.style.transform = 'translate3d(0, 0, 0)';
    layer.style.minWidth = '100%';
    layer.style.minHeight = '100%';
    layer.style.top = '0';
    layer.style.left = '0';

    return layer;
  }

  syncWithCamera() {
    const position = this.camera!.getPosition();
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.subnode.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  getNode() {
    return this.node;
  }

  getSubnode() {
    return this.subnode;
  }

  drawImage() {}

  drawRect() {}

  clear() {}
}
