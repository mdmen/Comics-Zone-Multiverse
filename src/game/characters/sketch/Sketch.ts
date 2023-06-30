import { type GameObjectOptions } from '@/engine';
import { Character } from '../Character';
import { IdleState, RunState } from './states';

export class Sketch extends Character {
  constructor(options: GameObjectOptions) {
    super(options);

    this.addStates();
  }

  private addStates(): void {
    this.states['idle'] = new IdleState({ game: {}, character: this });
    this.states['run'] = new RunState({ game: {}, character: this });
  }
}
