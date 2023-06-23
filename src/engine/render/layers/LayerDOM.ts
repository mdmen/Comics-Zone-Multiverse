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
    const posX = Math.floor(position.x);
    const posY = Math.floor(position.y);

    element.style.backgroundPosition = `${sx}px ${sy}px`;
    element.style.width = `${Math.floor(width)}px`;
    element.style.height = `${Math.floor(height)}px`;
    element.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  }

  public clear(): void {
    return;
  }
}
