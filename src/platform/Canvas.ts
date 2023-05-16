import { getAppContainer } from '../helpers';

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
  width: 800,
  height: 600,
  offscreen: false,
  transparent: true,
  imageSmooth: false,
} as const;

export class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private options: Required<Options>;

  constructor(options: Options = {}) {
    this.options = {
      ...defaults,
      ...options,
    };

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
    const container = getAppContainer();
    container.appendChild(this.canvas);
  }

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.canvas.style[name] = value;
  }
}
