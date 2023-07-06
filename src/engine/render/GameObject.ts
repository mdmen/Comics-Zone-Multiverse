import {
  type AnimationOptions,
  type Sprite,
  type SpriteOptions,
} from './sprites/Sprite';
import type { Layer } from './layers/Layer';
import { createSprite } from './sprites/createSprite';

export type GameObjectOptions = SpriteOptions;

export class GameObject {
  protected readonly sprite;

  constructor(options: GameObjectOptions) {
    this.sprite = createSprite(options);
  }

  public draw(): void {
    this.sprite.draw();
  }

  public update(step: number): void {
    this.sprite.update(step);
  }

  public destroy(): void {
    this.sprite.destroy();
  }

  public getLayer(): Layer {
    return this.sprite.getLayer();
  }

  public addAnimation(options: AnimationOptions): Sprite {
    return this.sprite.addAnimation(options);
  }

  public setAnimation(name: string): void {
    this.sprite.setAnimation(name);
  }
}
