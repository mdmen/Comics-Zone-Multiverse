import { LayerBase } from './LayerBase';

export class LayerDOM extends LayerBase {
  protected create(): HTMLDivElement {
    const layer = document.createElement('div');

    layer.style.overflow = 'hidden';

    return layer;
  }

  public draw(
    element: HTMLDivElement,
    x = 0,
    y = 0,
    width: number,
    height: number,
    dx = 0,
    dy = 0
  ): void {
    element.style.backgroundPosition = `${x}px ${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }

  public clear(): void {
    return;
  }
}
