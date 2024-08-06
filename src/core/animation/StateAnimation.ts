import type { State } from '../state';
import { Animation } from './Animation';
import type { AnimationFrame } from './AnimationFrame';

export class StateAnimation<T extends AnimationFrame = AnimationFrame>
  extends Animation<T>
  implements State
{
  public leave() {
    this.reset();
  }

  public enter() {
    this.play();
  }
}
