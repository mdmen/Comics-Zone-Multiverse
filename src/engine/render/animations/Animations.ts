import { Vector } from '../../geometries';
import type { ImageSpriteData, ImageSpriteFrame } from '../../assets/types';

export class Animations {
  private animations = new Set<SpriteAnimation>();
  private animation = null;
  private readonly frameOffset = new Vector();

  constructor() {}

  addAnimation({ name, frames, infinite = false }: AnimationOptions): Sprite {
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

  setAnimation(name: string) {
    const animation = this.animations[name];

    if (!animation) {
      throw Error(`Animation ${name} does not exists`);
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
    this.animation.update();

    const { frame, offset } = this.animation.getCurrentFrameSource();

    const sourceX = this.flipped
      ? this.image.width - (frame.x + frame.w)
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
}
