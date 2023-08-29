import { Point, Vector } from '../../math';
import { Image, type ImageOptions } from '../Image';
import { SpriteAnimation } from './SpriteAnimation';

interface FrameBoundaries {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Frame {
  name: string;
  duration?: number;
}

export interface FrameSource {
  frame: FrameBoundaries;
  offset?: Point;
}

export interface SpriteImageData {
  frames: Record<string, FrameSource>;
}

export interface SpriteOptions extends ImageOptions {
  data?: SpriteImageData;
}

export interface AnimationOptions {
  name: string;
  frames: Frame[];
  infinite?: boolean;
}

export class Sprite extends Image {
  private readonly data;
  private readonly animations: Record<string, SpriteAnimation>;
  private readonly offset = new Vector();
  private animation!: SpriteAnimation;

  constructor(options: SpriteOptions) {
    super(options);

    const { data } = options;
    this.data = data;
    this.animations = {};
  }

  public addAnimation({
    name,
    frames,
    infinite = false,
  }: AnimationOptions): Sprite {
    if (!this.data) {
      throw Error(`Sprite with "${name}" animation has no frames`);
    }

    this.animations[name] = new SpriteAnimation({
      frameSources: this.data.frames,
      frames,
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

  private resetAnimationOffset(): void {
    if (this.flipped) {
      const posOffsetX = this.position.x + this.offset.x;
      const posOffsetY = this.position.y - this.offset.y;

      this.position.set(posOffsetX, posOffsetY);
    } else {
      this.position.subtract(this.offset);
    }
  }

  private updateAnimationOffset(offset: Point): void {
    if (this.flipped) {
      const posOffsetX = this.position.x - offset.x;
      const posOffsetY = this.position.y + offset.y;

      this.position.set(posOffsetX, posOffsetY);
    } else {
      this.position.add(offset);
    }

    this.offset.copy(offset);
  }

  private updateAnimation(): void {
    this.animation.update();

    const { frame, offset } = this.animation.getCurrentFrameSource();

    const sourceX = this.flipped
      ? this.image.width - (frame.x + frame.w)
      : frame.x;
    this.source.set(sourceX, frame.y);

    this.width = frame.w;
    this.height = frame.h;

    if (offset && !this.offset.isEqualTo(offset)) {
      this.resetAnimationOffset();
      this.updateAnimationOffset(offset);
    }
  }

  public update(step: number): void {
    super.update(step);
    this.animation && this.updateAnimation();
  }
}
