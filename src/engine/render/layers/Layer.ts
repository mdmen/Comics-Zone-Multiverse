import { Settings } from '../../Settings';

export interface LayerOptions {
  container: HTMLElement;
  isTransparent?: boolean;
}

type AllowedProps = 'zIndex' | 'position';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Layer {
  private readonly container;
  private readonly width = Settings.getValue('canvasWidth');
  private readonly height = Settings.getValue('canvasHeight');
  protected readonly node;

  constructor(options: LayerOptions) {
    const { container } = options;
    this.container = container;

    this.node = this.create(options);

    this.node.classList.add(Settings.getValue('canvasClassName'));
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    if (!Settings.getValue('antialiasing')) {
      this.node.style.imageRendering = 'pixelated';
      this.node.style.textRendering = 'optimizeSpeed';
    }

    this.mount();
  }

  private mount(): void {
    this.container.appendChild(this.node);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.node.style[name] = value;
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public show(): void {
    this.node.style.display = 'initial';
  }

  public hide(): void {
    this.node.style.display = 'hidden';
  }

  protected abstract create(options: LayerOptions): HTMLElement;

  public abstract draw(
    element: HTMLDivElement | HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    dx: number,
    dy: number
  ): void;

  public abstract clear(...args: unknown[]): void;
}
