import { Sprite } from './Sprite';

export class SpriteCanvas extends Sprite {
  public draw(): void {
    if (!this.isVisible()) return;

    const offset = this.getOffset();
    const { frame } = this.animation.getCurrentFrame();

    this.layer.draw(
      this.image,
      this.flipped ? this.image.width - frame.x : -frame.x,
      this.flipped ? this.image.height - frame.y : -frame.y,
      this.width,
      this.height,
      this.flipped ? this.x + offset.x : -this.x + offset.x,
      this.flipped ? this.y + offset.y : -this.y + offset.y
    );
  }

  public update(timeStamp: number): void {
    super.update(timeStamp);
  }
}
