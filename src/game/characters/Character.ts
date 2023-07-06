import {
  GameObject,
  StateMachine,
  type GameObjectOptions,
  type Sounds,
} from '@/engine';

export interface CharacterOptions extends GameObjectOptions {
  sounds?: Sounds;
  strength?: number;
  speed?: number;
  health?: number;
}

export abstract class Character extends GameObject {
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

  public getMovingState(): StateMachine {
    return this.moveStates;
  }

  public update(step: number): void {
    const moveState = this.moveStates.getState();
    moveState.onUpdate(step);
    super.update(step);
  }

  public abstract getSounds(): Sounds;
}
