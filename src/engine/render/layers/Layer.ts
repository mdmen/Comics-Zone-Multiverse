import {
  canvasDefaultWidth,
  canvasDefaultHeight,
  canvasDefaultAntialiasing,
  canvasClassName,
} from '../../settings';

export interface LayerOptions {
  container: HTMLElement;
  width?: number;
  height?: number;
  isTransparent?: boolean;
  isAntialiasing?: boolean;
}

type AllowedProps = 'zIndex';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Layer {
  private readonly container;
  private readonly width;
  private readonly height;
  protected layer;

  constructor(options: LayerOptions) {
    const {
      container,
      width = canvasDefaultWidth,
      height = canvasDefaultHeight,
      isAntialiasing = canvasDefaultAntialiasing,
    } = options;
    this.container = container;
    this.width = width;
    this.height = height;

    this.layer = this.create(options);

    this.layer.classList.add(canvasClassName);
    this.layer.style.width = `${this.width}px`;
    this.layer.style.height = `${this.height}px`;

    if (isAntialiasing) this.layer.style.imageRendering = 'pixelated';
  }

  public mount(): void {
    this.container.appendChild(this.layer);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.layer.style[name] = value;
  }

  public getLayer(): HTMLElement {
    return this.layer;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public show(): void {
    this.layer.style.display = 'initial';
  }

  public hide(): void {
    this.layer.style.display = 'hidden';
  }

  protected abstract create(options: LayerOptions): HTMLElement;

  public abstract draw(...args: unknown[]): void;

  public abstract clear(...args: unknown[]): void;
}
