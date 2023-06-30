import type { State } from '@/engine';
import type { Character } from './Character';

export interface CharacterStateOptions {
  game: unknown;
  character: Character;
}

export abstract class CharacterState implements State {
  protected readonly game;
  protected readonly character;

  constructor({ game, character }: CharacterStateOptions) {
    this.game = game;
    this.character = character;

    this.onInit();
  }

  protected abstract onInit(): void;

  public abstract onEnter(): void;

  public abstract onLeave(): void;

  public abstract onUpdate(): void;
}
