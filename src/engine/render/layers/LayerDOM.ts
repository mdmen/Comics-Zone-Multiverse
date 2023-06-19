import type { Vector } from '../../math';
import { Layer } from './Layer';

export class LayerDOM extends Layer {
  protected create(): HTMLDivElement {
    const layer = document.createElement('div');

    layer.style.overflow = 'hidden';

    return layer;
  }

  public draw(
    element: HTMLDivElement,
    sx = 0,
    sy = 0,
    width: number,
    height: number,
    position: Vector
  ): void {
    const posX = Math.round(position.x);
    const posY = Math.round(position.y);

    element.style.backgroundPosition = `${sx}px ${sy}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public clear(): void {
    return;
  }
}
