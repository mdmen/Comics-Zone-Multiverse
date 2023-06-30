import { GameObject, type GameObjectOptions } from '@/engine';

interface Options extends GameObjectOptions {
  strength?: number;
  speed?: number;
  health?: number;
}

export class Character extends GameObject {
  protected strength;
  protected speed;
  protected health;

  constructor({ strength = 1, speed = 1, health = 100, ...options }: Options) {
    super(options);

    this.strength = strength;
    this.speed = speed;
    this.health = health;
  }
}
