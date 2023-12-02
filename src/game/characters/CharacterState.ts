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

  abstract enter(): void;

  abstract update(): void;

  abstract leave(): void;
}
