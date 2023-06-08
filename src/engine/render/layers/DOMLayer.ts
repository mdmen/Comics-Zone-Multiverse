import { Layer } from './Layer';

export class DOMLayer extends Layer {
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
    element.style.transform = `translate(${dx}px, ${dy}px)`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.backgroundPosition = `${x}px ${y}px`;
  }

  public clear(): void {
    return;
  }
}
