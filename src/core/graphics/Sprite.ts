import { StateMachine } from '../state';
import { type AnimationFrame, Animation } from '../animation';
import type { SpriteAtlas, SpriteFrame } from './SpriteAtlas';
import { Image, type ImageOptions } from './Image';

interface SpriteOptions extends ImageOptions {
  atlas: SpriteAtlas;
}

export class Sprite extends Image {
  private readonly atlas;
  public readonly animations = new StateMachine<Animation>();
  private currentAnimationFrame: AnimationFrame | null = null;
  private currentFrame: SpriteFrame = {
    frame: { x: 0, y: 0, w: 0, h: 0 },
  };

  constructor({ atlas, ...options }: SpriteOptions) {
    super(options);

    this.atlas = atlas;

    const { frame } = this.getCurrentFrame();
    this.size.set(frame.w, frame.h);
  }

  private getFrame(name: string) {
    const frame = this.atlas?.frames[name];

    if (!frame) {
      throw Error(`Sprite frame "${name}" does not exist`);
    }

    return frame;
  }

  public setFrame(name: string) {
    this.currentFrame = this.getFrame(name);
  }

  public getCurrentFrame() {
    return this.currentFrame;
  }

  public update(deltaStep: number) {
    super.update(deltaStep);

    const animation = this.animations.getCurrent();

    if (!animation) return;

    const animationFrame = animation.getCurrentFrame();
    if (this.currentAnimationFrame !== animationFrame) {
      this.setFrame(animationFrame.name);
      this.currentAnimationFrame = animationFrame;
    }

    this.animations.update(deltaStep);
  }
}
