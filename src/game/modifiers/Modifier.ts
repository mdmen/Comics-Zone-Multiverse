import { type Drawable } from '@/engine';

export abstract class Modifier {
  public abstract update(drawable: Drawable, step: number): void;
}
