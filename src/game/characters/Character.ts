import { StateMachine, type Sounds, Sprite, type SpriteOptions } from '@/core';

export interface CharacterOptions extends SpriteOptions {
  sounds?: Sounds;
  strength?: number;
  speed?: number;
  health?: number;
}

export abstract class Character extends Sprite {
  protected readonly moveStates = new StateMachine();
  protected readonly sounds;
  protected strength;
  protected speed;
  protected health;
  public readonly tags = new Set<string>();

  constructor({
    strength = 1,
    speed = 1,
    health = 100,
    sounds,
    ...options
  }: CharacterOptions) {
    super(options);

    this.strength = strength;
    this.sounds = sounds;
    this.speed = speed;
    this.health = health;
  }

  getMovingState(): StateMachine {
    return this.moveStates;
  }

  update(step: number) {
    const moveState = this.moveStates.getState();
    moveState.onUpdate(step);
    super.update(step);
  }

  abstract getSounds(): Sounds;
}
