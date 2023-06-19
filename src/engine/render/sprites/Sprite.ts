import { Vector, type Point, type Rectangle } from '../../math';
import { Drawable, type DrawableOptions } from '../Drawable';
import { SpriteAnimation } from './SpriteAnimation';

export interface SpriteFrame {
  frame: Rectangle;
  duration?: number;
  offset?: Point;
}

export interface SpriteImageData {
  frames: Record<string, SpriteFrame>;
}

export interface SpriteOptions extends DrawableOptions {
  data?: SpriteImageData;
}

interface AnimationOptions {
  name: string;
  frameNames: string[];
  infinite?: boolean;
}

export abstract class Sprite extends Drawable {
  private readonly data;
  private readonly animations: Record<string, SpriteAnimation>;
  protected animation: SpriteAnimation;

  constructor(options: SpriteOptions) {
    super(options);

    const { data } = options;
    this.data = data;
    this.animations = {};
  }

  public addAnimation({
    name,
    frameNames,
    infinite = false,
  }: AnimationOptions): Sprite {
    if (!this.data) {
      throw Error(`Sprite with "${name}" animation has no frames`);
    }

    this.animations[name] = new SpriteAnimation({
      frames: this.data.frames,
      names: frameNames,
      infinite,
    });

    if (!this.animation) this.setAnimation(name);

    return this;
  }

  public setAnimation(name: string): void {
    const animation = this.animations[name];

    if (!animation) {
      throw Error(`Animation ${name} does not exists`);
    }

    this.animation?.reset();
    this.animation = animation;
    this.animation.play();
  }

  private updateAnimation(): void {
    this.animation.update();

    const { frame, offset } = this.animation.getCurrentFrame();

    this.width = frame.width;
    this.height = frame.height;

    if (!offset) return;

    if (this.flipped) {
      this.position.x -= offset.x;
      this.position.y += offset.y;
    } else {
      this.position.add(offset);
    }
  }

  public update(deltaStep: number): void {
    this.animation && this.updateAnimation();

    const velocity = new Vector(this.velocity.x, this.velocity.y);
    velocity.multiply(deltaStep);

    this.position.add(velocity);
  }
}
