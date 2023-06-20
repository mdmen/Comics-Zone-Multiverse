import type { Vector } from '../../math';
import { Settings } from '../../Settings';

export interface LayerOptions {
  container: HTMLElement;
  isTransparent?: boolean;
}

type AllowedProps = 'zIndex' | 'position';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Layer {
  private readonly container;
  protected readonly node;
  protected readonly width = Settings.getValue('canvasWidth');
  protected readonly height = Settings.getValue('canvasHeight');

  constructor(options: LayerOptions) {
    const { container } = options;
    this.container = container;

    this.node = this.create(options);
    this.init();
  }

  private init(): void {
    this.node.classList.add(Settings.getValue('canvasClassName'));
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    if (!Settings.getValue('antialiasing')) {
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
