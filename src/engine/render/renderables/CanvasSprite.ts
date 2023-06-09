import { Renderable } from './Renderable';
import type { SpriteOptions } from './types';

export class CanvasSprite extends Renderable {
  private readonly selfClear;
  private readonly prevDrawCoords;

  constructor(options: SpriteOptions) {
    super(options);

    const { selfClear, x, y, width, height } = options;
    this.selfClear = selfClear;
    this.prevDrawCoords = { x, y, width, height };
  }

  private updatePrevDrawCoords(): void {
    this.prevDrawCoords.x = this.x;
    this.prevDrawCoords.y = this.y;
    this.prevDrawCoords.width = this.width;
    this.prevDrawCoords.height = this.height;
  }

  public draw(): void {
    if (!this.shouldDraw()) return;

    if (this.selfClear) {
      this.clear();
    }

    this.updatePrevDrawCoords();
  }

  public update(): void {
    return;
  }

  public clear(): void {
    const { x, y, width, height } = this.prevDrawCoords;
    this.layer.clear(x, y, width, height);
  }
}
