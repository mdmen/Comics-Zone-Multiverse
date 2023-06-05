import {
  canvasDefaultWidth,
  canvasDefaultHeight,
  canvasDefaultSmoothing,
} from '../../settings';

interface Options {
  width?: number;
  height?: number;
  offscreen?: boolean;
  transparent?: boolean;
  imageSmooth?: boolean;
}

type AllowedProps = 'zIndex';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

const defaults: Required<Options> = {
  width: canvasDefaultWidth,
  height: canvasDefaultHeight,
  offscreen: false,
  transparent: true,
  imageSmooth: canvasDefaultSmoothing,
} as const;

export class DOMLayer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private options: Required<Options>;
  private container;

  constructor(container: HTMLElement, options: Options = {}) {
    this.options = {
      ...defaults,
      ...options,
    };

    this.container = container;
    this.canvas = this.createCanvas();
    this.context = this.createContext();

    if (!this.options.offscreen) {
      this.mountCanvas();
    }
  }

  private createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = this.options.width;
    canvas.height = this.options.height;

    return canvas;
  }

  private createContext() {
    const context = this.canvas?.getContext('2d', {
      alpha: this.options.transparent,
    });

    if (!context) {
      throw Error('Cannot create context');
    }

    context.imageSmoothingEnabled = this.options.imageSmooth;

    return context;
  }

  private mountCanvas() {
    this.container.appendChild(this.canvas);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.canvas.style[name] = value;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public clear(): void {
    const { width, height } = this.options;
    this.context.clearRect(0, 0, width, height);
  }
}
