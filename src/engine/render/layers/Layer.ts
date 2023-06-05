import { canvasDefaultWidth, canvasDefaultHeight } from '@/engine/settings';

export interface LayerOptions {
  width?: number;
  height?: number;
}

const defaults: Required<LayerOptions> = {
  width: canvasDefaultWidth,
  height: canvasDefaultHeight,
} as const;

type AllowedProps = 'zIndex';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Layer {
  protected layer: HTMLElement;
  private container;

  constructor(container: HTMLElement, options: LayerOptions) {
    this.container = container;
    this.layer = this.createLayer({
      ...defaults,
      ...options,
    });
    this.mountLayer();
  }

  protected mountLayer(): void {
    this.container.appendChild(this.layer);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.layer.style[name] = value;
  }

  public getLayer(): HTMLElement {
    return this.layer;
  }

  protected abstract createLayer(options: LayerOptions): HTMLElement;

  public abstract draw(): void;

  public abstract clear(): void;
}
