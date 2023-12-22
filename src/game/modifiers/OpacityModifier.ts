import { type Drawable } from '@/engine';
import { Modifier } from './Modifier';

export class OpacityModifier extends Modifier {
  private velocity;
  private counter = 0;

  constructor(velocity = 1) {
    super();

    this.velocity = velocity;
  }

  update(drawable: Drawable, step: number) {
    drawable.setOpacity(
      Math.abs(Math.sin(this.counter * step * this.velocity) * 0.5 + 0.5)
    );

    this.counter++;
  }
}
