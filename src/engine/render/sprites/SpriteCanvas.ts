import { Sprite } from './Sprite';

export class SpriteCanvas extends Sprite {
  public draw(): void {
    if (!this.isVisible()) return;

    let sourceX = 0;
    let sourceY = 0;

    if (this.animation) {
      const { frame } = this.animation.getCurrentFrame();

      sourceX = this.flipped ? this.image.width - frame.x : frame.x;
      sourceY = frame.y;
    }

    this.layer.draw(
      this.image,
      sourceX,
      sourceY,
      this.width,
      this.height,
      this.x,
      this.y
    );
  }
}
