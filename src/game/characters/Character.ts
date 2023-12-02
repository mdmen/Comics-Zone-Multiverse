import {
  StateMachine,
  type Sounds,
  Sprite,
  type SpriteOptions,
} from '@/engine';

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
    moveState.update(step);
    super.update(step);
  }

  abstract getSounds(): Sounds;
}
