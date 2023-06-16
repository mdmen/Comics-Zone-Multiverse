import { Drawable, type DrawableOptions } from '../Drawable';
import { SpriteAnimation } from './SpriteAnimation';

interface Frame {
  x: number;
  y: number;
  w?: number;
  h?: number;
}

interface SpriteOffset {
  readonly x: number;
  readonly y: number;
}

export interface SpriteFrame {
  frame: Frame;
  duration?: number;
  offset?: SpriteOffset;
}

export interface SpriteOptions extends DrawableOptions {
  frames: Record<string, SpriteFrame>;
}

export abstract class Sprite extends Drawable {
  private readonly frames;
  private readonly animations: Record<string, SpriteAnimation>;
  protected animation: SpriteAnimation;

  constructor(options: SpriteOptions) {
    super(options);

    const { frames } = options;
    this.frames = frames;
    this.animations = {};
  }

  public addAnimation(
    name: string,
    frameNames: (keyof typeof this.frames)[]
  ): Sprite {
    this.animations[name] = new SpriteAnimation({
      frames: this.frames,
      names: frameNames,
    });

    return this;
  }

  public setAnimation(name: string): void {
    const animation = this.animations[name];

    if (!animation) {
      throw Error(`Animation ${name} does not exists`);
    }

    this.animation.reset();
    this.animation = animation;
    this.animation.play();
  }

  public update(deltaTime: number): void {
    this.animation.update(deltaTime);

    const { frame } = this.animation.getCurrentFrame();
    frame.w && (this.width = frame.w);
    frame.h && (this.height = frame.h);
  }
}
