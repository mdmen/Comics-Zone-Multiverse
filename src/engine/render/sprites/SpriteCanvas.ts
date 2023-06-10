import { SpriteBase, type SpriteOptions } from './SpriteBase';

export class SpriteCanvas extends SpriteBase {
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

    const { frame, offset } = this.animation.getCurrentFrame();
    const offsetX = offset?.x || 0;
    const offsetY = offset?.y || 0;

    this.layer.draw(
      this.image,
      this.flipped ? this.image.width - frame.x : -frame.x,
      this.flipped ? this.image.height - frame.y : -frame.y,
      this.width,
      this.height,
      this.flipped ? this.x + offsetX : -this.x + offsetX,
      this.flipped ? this.y + offsetY : -this.y + offsetY
    );

    this.updatePrevDrawCoords();
  }

  public update(timeStamp: number): void {
    super.update(timeStamp);
  }

  public clear(): void {
    const { x, y, width, height } = this.prevDrawCoords;
    this.layer.clear(x, y, width, height);
  }
}
