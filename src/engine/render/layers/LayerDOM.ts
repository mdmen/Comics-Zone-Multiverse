import { Settings } from '../../Settings';
import type { Camera } from '../Camera';
import type { SpriteDOM } from '../sprites/SpriteDOM';
import { Layer } from './Layer';

export class LayerDOM extends Layer {
  private subnode!: HTMLDivElement;

  protected create(): HTMLDivElement {
    const layer = document.createElement('div');
    layer.style.overflow = 'hidden';

    this.subnode = this.createSubLayer();
    layer.appendChild(this.subnode);

    return layer;
  }

  private createSubLayer(): HTMLDivElement {
    const layer = document.createElement('div');
    const className = Settings.get('canvasSubLayerClassName');

    layer.classList.add(className);
    layer.style.position = 'absolute';
    layer.style.transform = 'translate3d(0, 0, 0)';
    layer.style.minWidth = '100%';
    layer.style.top = '0';
    layer.style.left = '0';

    return layer;
  }

  protected syncWithCamera(): void {
    const position = this.camera!.getPosition();
    const posX = -Math.floor(position.x);
    const posY = -Math.floor(position.y);

    this.subnode.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public draw(sprite: SpriteDOM): void {
    if (!this.shouldDraw(sprite)) return;

    const node = sprite.getNode();
    const position = sprite.getPosition();
    const posX = Math.floor(position.x);
    const posY = Math.floor(position.y);
    const width = Math.floor(sprite.getWidth());
    const height = Math.floor(sprite.getHeight());
    const source = sprite.getSource();

    node.style.backgroundPosition = `${-source.x}px ${-source.y}px`;
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;
    node.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public postDraw(): void {
    return;
  }

  public getSubnode(): HTMLDivElement {
    return this.subnode;
  }
}
