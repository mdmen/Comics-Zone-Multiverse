import type { Updatable } from './Updatable';

export interface Modifier {
  update(updatable: Updatable, step: number): void;
}
