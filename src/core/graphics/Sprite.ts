import { StateMachine } from '../state';
import { type AnimationFrame, Animation } from '../animation';
import type { SpriteAtlas } from './SpriteAtlas';
import { Image, type ImageOptions } from './Image';
import { Vector } from '../geometry';

interface SpriteOptions extends ImageOptions {
  atlas: SpriteAtlas;
}

export class Sprite extends Image {
  private readonly atlas;
  public readonly animations = new StateMachine<Animation>();
  private currentFrame: AnimationFrame | null = null;
  public readonly offset = new Vector(0, 0);

  constructor({ atlas, ...options }: SpriteOptions) {
    super(options);

    this.atlas = atlas;
  }

  private getFrame(name: string) {
    const frame = this.atlas?.frames[name];

    if (!frame) {
      throw Error(`Sprite frame "${name}" does not exist`);
    }

    return frame;
  }

  public setFrame(name: string) {
    const { frame, offset } = this.getFrame(name);

    this.source.set(frame.x, frame.y);
    this.size.set(frame.w, frame.h);

    if (offset) {
      this.offset.set(offset.x || 0, offset.y || 0);
    }
  }

  public update(deltaStep: number) {
    super.update(deltaStep);

    const animation = this.animations.getCurrent();

    if (!animation) return;

    const animationFrame = animation.getCurrentFrame();
    if (this.currentFrame !== animationFrame) {
      this.setFrame(animationFrame.name);
      this.currentFrame = animationFrame;
    }

    this.animations.update(deltaStep);
  }
}
