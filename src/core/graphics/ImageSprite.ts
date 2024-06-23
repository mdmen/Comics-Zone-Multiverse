import type { ImageSpriteAtlas, ImageSpriteFrame } from './ImageSpriteAtlas';
import type { Image } from './Image';
import type { AnimationFrame, Animation } from '../animation';
import { StateMachine } from '../state';

export class ImageSprite<Frame extends ImageSpriteFrame = ImageSpriteFrame> {
  public readonly animations = new StateMachine<Animation>();
  private currentAnimationFrame: AnimationFrame | null = null;
  private currentFrame: ImageSpriteFrame = {
    frame: { x: 0, y: 0, w: 0, h: 0 },
  };

  constructor(
    public readonly image: Image,
    private readonly atlas: ImageSpriteAtlas<Frame>
  ) {}

  private getFrame(name: string) {
    const frame = this.atlas.frames[name];

    if (!frame) {
      throw Error(`Frame "${name}" does not exist`);
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
    const animation = this.animations.getCurrent();

    if (!animation) return;

    const frame = animation.getCurrentFrame();
    if (this.currentAnimationFrame !== frame) {
      this.setFrame(frame.name);
      this.currentAnimationFrame = frame;
    }

    this.animations.update(deltaStep);
  }
}
