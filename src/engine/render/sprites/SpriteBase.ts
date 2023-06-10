import { Renderable, type RenderableOptions } from '../Renderable';
import { SpriteAnimation } from './SpriteAnimation';

export interface SpriteFrame {
  frame: {
    x: number;
    y: number;
    w?: number;
    h?: number;
  };
  duration?: number;
  offset?: {
    x: number;
    y: number;
  };
}

export interface SpriteOptions extends RenderableOptions {
  frames: Record<string, SpriteFrame>;
}

export abstract class SpriteBase extends Renderable {
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
  ): SpriteBase {
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

  public update(timeStamp: number): void {
    this.animation.update(timeStamp);

    const { frame } = this.animation.getCurrentFrame();
    frame.w && (this.width = frame.w);
    frame.h && (this.height = frame.h);
  }
}
