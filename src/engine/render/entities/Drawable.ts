export interface DrawableOptions {
  source: HTMLImageElement;
  context: CanvasRenderingContext2D;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  visible?: boolean;
}

export abstract class Drawable {
  protected readonly source;
  protected readonly context;
  protected x;
  protected y;
  protected width;
  protected height;
  protected visible;

  constructor({
    source,
    context,
    x = 0,
    y = 0,
    width = source.width,
    height = source.height,
    visible = true,
  }: DrawableOptions) {
    this.source = source;
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = visible;
  }

  public abstract draw(): void;

  public abstract update(): void;
}
