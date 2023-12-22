import type { ImageSpriteData } from '../assets/types';
import { Vector, type Point } from '../geometries';
import { Picture, type PictureOptions } from './Picture';
import { Animation } from './Animation';

export interface SpriteOptions extends PictureOptions {
  data: ImageSpriteData;
}

export class Sprite extends Picture {
  private data;
  private animations = new Map<string, Animation>();
  private animation: Animation | null = null;
  private readonly frameOffset = new Vector();

  constructor(options: SpriteOptions) {
    super(options);

    this.data = options.data;
  }

  addAnimation(name: string, animation: Animation) {
    this.animations.set(name, animation);

    if (!this.animation) this.setAnimation(name);

    return this;
  }

  setAnimation(name: string) {
    const animation = this.animations.get(name);

    if (!animation) {
      throw Error(`Animation "${name}" does not exists`);
    }

    this.animation?.reset();
    this.animation = animation;
    this.animation.play();
  }

  private resetAnimationOffset() {
    if (this.flipped) {
      const posOffsetX = this.position.x + this.frameOffset.x;
      const posOffsetY = this.position.y - this.frameOffset.y;

      this.position.set(posOffsetX, posOffsetY);
    } else {
      this.position.subtract(this.frameOffset);
    }
  }

  private updateAnimation() {
    if (!this.animation || !this.image) return;

    this.animation.update();

    const currentFrame = this.animation.gerCurrentFrame();
    const { frame, offset } = this.data.frames[currentFrame.name];

    const sourceX = this.flipped
      ? this.image.getWidth() - (frame.x + frame.w)
      : frame.x;
    this.source.set(sourceX, frame.y);

    this.width = frame.w;
    this.height = frame.h;

    if (offset && !this.frameOffset.isEqualTo(offset)) {
      this.resetAnimationOffset();
      this.updateAnimationOffset(offset);
    }
  }

  private updateAnimationOffset(offset: Point) {
    if (this.flipped) {
      const posOffsetX = this.position.x - offset.x;
      const posOffsetY = this.position.y + offset.y;

      this.position.set(posOffsetX, posOffsetY);
    } else {
      this.position.add(offset);
    }

    this.frameOffset.copy(offset);
  }

  update(step: number) {
    super.update(step);
    this.updateAnimation();
  }

  destroy() {
    super.destroy();

    this.data = null as unknown as ImageSpriteData;
    this.animations.clear();
    this.animation = null;
  }
}
