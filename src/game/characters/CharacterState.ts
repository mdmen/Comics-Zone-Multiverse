import type { Character } from './Character';

export interface CharacterStateOptions {
  character: Character;
}

export abstract class CharacterState {
  protected readonly character;

  constructor({ character }: CharacterStateOptions) {
    this.character = character;
  }

  abstract onEnter(): void;

  abstract onUpdate(): void;

  abstract onLeave(): void;
}
