import { CharacterState, CharacterStateOptions } from '../CharacterState';
import { type Sketch } from './Sketch';

export interface SketchStateOptions extends CharacterStateOptions {
  character: Sketch;
}

export abstract class SketchState extends CharacterState {
  protected readonly character;

  constructor({ character }: SketchStateOptions) {
    super({ character });

    this.character = character;
  }

  protected abstract onInput(): void;

  public onUpdate(): void {
    this.onInput();
  }
}
