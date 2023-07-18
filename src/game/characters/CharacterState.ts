import type { State } from '@/engine';
import type { Character } from './Character';

export interface CharacterStateOptions {
  character: Character;
}

export abstract class CharacterState implements State {
  protected readonly character;

  constructor({ character }: CharacterStateOptions) {
    this.character = character;
  }

  public abstract enter(): void;

  public abstract update(): void;

  public abstract leave(): void;
}
