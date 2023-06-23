import { Rectangle, Vector, type RectangleOptions } from '../../math';
import { Settings } from '../../Settings';

export interface LayerOptions extends RectangleOptions {
  container: HTMLElement;
  isTransparent?: boolean;
}

type AllowedProps = 'zIndex' | 'position';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Layer extends Rectangle {
  private readonly container;
  protected readonly node;

  constructor(options: LayerOptions) {
    super(options);

    const {
      container,
      width = Settings.get('canvasWidth'),
      height = Settings.get('canvasHeight'),
    } = options;

    this.width = width;
    this.height = height;
    this.container = container;

    this.node = this.create(options);
    this.init();
  }

  private init(): void {
    this.node.classList.add(Settings.get('canvasClassName'));
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    if (!Settings.get('antialiasing')) {
      this.node.style.imageRendering = 'pixelated';
      this.node.style.textRendering = 'optimizeSpeed';
    }

    this.container.appendChild(this.node);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.node.style[name] = value;
  }

  public show(): void {
    this.node.style.display = 'initial';
  }

  public hide(): void {
    this.node.style.display = 'hidden';
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

  protected abstract create(options: LayerOptions): HTMLElement;

  public abstract draw(
    element: HTMLDivElement | HTMLImageElement,
    sx: number,
    sy: number,
    width: number,
    height: number,
    position: Vector
  ): void;

  public abstract clear(...args: unknown[]): void;
}
