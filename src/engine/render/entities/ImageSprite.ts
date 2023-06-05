import { Drawable, type DrawableOptions } from './Drawable';

interface SpriteOptions extends DrawableOptions {
  data: Record<string, unknown>;
}

export class Sprite extends Drawable {
  private readonly data;

  constructor(options: SpriteOptions) {
    super(options);

    this.data = options.data;
  }

  public draw(): void {
    void 0;
  }
}
