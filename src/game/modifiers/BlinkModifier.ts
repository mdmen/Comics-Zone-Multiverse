import type { Drawable } from '@/core';

export class BlinkModifier {
  private velocity;
  private counter = 0;

  constructor(velocity = 1) {
    this.velocity = velocity;
  }

  update(drawable: Drawable, step: number) {
    drawable.setOpacity(
      Math.abs(Math.sin(this.counter * step * this.velocity) * 0.5 + 0.5)
    );

    this.counter++;
  }
}
