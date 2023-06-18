import { Drawable, type DrawableOptions } from '../Drawable';
import { SpriteAnimation } from './SpriteAnimation';

interface Frame {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Offset {
  x: number;
  y: number;
}

export interface SpriteFrame {
  frame: Frame;
  duration?: number;
  offset?: Offset;
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

  public update(timeStamp: number): void {
    if (!this.animation) return;

    this.animation.update(timeStamp);

    const { frame, offset } = this.animation.getCurrentFrame();
    const offsetX = offset?.x || 0;
    const offsetY = offset?.y || 0;

    this.x = this.flipped ? this.x - offsetX : this.x + offsetX;
    this.y = this.flipped ? this.y - offsetY : this.y + offsetY;
    this.width = frame.w;
    this.height = frame.h;
  }
}
