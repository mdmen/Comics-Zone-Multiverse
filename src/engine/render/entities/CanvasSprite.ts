import { CanvasLayer } from '../layers/CanvasLayer';
import { Renderable, type RenderableOptions } from './Renderable';

interface SpriteOptions extends RenderableOptions {
  layer: CanvasLayer;
  selfClear?: boolean;
  data?: Record<string, unknown>;
}

export class CanvasSprite extends Renderable {
  private readonly selfClear;
  private readonly prevDrawCoords = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  constructor(options: SpriteOptions) {
    super(options);

    const { selfClear } = options;
    this.selfClear = selfClear;
  }

  private updatePrevDrawCoords(): void {
    this.prevDrawCoords.x = this.x;
    this.prevDrawCoords.y = this.y;
    this.prevDrawCoords.width = this.width;
    this.prevDrawCoords.height = this.height;
  }

  public draw(): void {
    if (!this.visible || !this.dirty) return;

    if (this.selfClear) {
      this.clear();
    }

    this.updatePrevDrawCoords();
  }

  public update(): void {
    void 0;
  }

  public clear(): void {
    const { x, y, width, height } = this.prevDrawCoords;
    this.layer.clear(x, y, width, height);
  }
}
