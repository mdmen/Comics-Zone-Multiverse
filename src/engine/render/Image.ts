import { Drawable } from './Drawable';

export class Image extends Drawable {
  public draw(): void {
    if (this.visible) {
      this.context.drawImage(
        this.source,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
