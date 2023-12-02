import { type Drawable } from '@/engine';
import { Modifier } from './Modifier';
import { Pendulum } from '../components';

interface Options {
  velocity?: number;
}

export class OpacityModifier extends Modifier {
  private readonly pendulum;

  constructor({ velocity = 1 }: Options = {}) {
    super();

    this.pendulum = new Pendulum({ velocity });
  }

  update(drawable: Drawable, step: number) {
    this.pendulum.update(step);

    const opacity = this.pendulum.getValue();
    drawable.setOpacity(opacity);
  }
}
