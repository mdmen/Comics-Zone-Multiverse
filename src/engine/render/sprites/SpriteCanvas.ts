import { Sprite } from './Sprite';

export class SpriteCanvas extends Sprite {
  public draw(): void {
    if (!this.isVisible()) return;

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
  }

  public update(timeStamp: number): void {
    super.update(timeStamp);
  }
}
