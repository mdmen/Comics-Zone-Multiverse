import type { DrawableImage, SpriteAtlas } from '../graphics';
import { StateMachine } from '../state';
import type { AnimationFrame, StateAnimation } from '../animation';
import { type ImageEntityOptions, ImageEntity } from './ImageEntity';
import { Vector } from '../geometry';

export interface SpriteEntityOptions<T extends SpriteAtlas>
  extends ImageEntityOptions {
  atlas: T;
}

export class SpriteEntity<
  T extends SpriteAtlas = SpriteAtlas
> extends ImageEntity {
  public declare readonly drawable: DrawableImage;
  public readonly animations = new StateMachine<StateAnimation>();
  private currentFrame: AnimationFrame | null = null;
  private readonly prevOffset = new Vector(0, 0);
  public readonly atlas: T;

  constructor({ atlas, ...options }: SpriteEntityOptions<T>) {
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

    this.drawable.source.set(frame.x, frame.y);
    this.size.set(frame.w, frame.h);

    this.position.subV(this.prevOffset);
    if (offset) {
      const offsetX = offset.x || 0;
      const offsetY = offset.y || 0;

      this.position.add(offsetX, offsetY);
      this.prevOffset.set(offsetX, offsetY);
    }
  }

  public update(deltaStep: number) {
    super.update(deltaStep);

    const animation = this.animations.get();

    if (!animation) return;

    const animationFrame = animation.getCurrentFrame();
    if (this.currentFrame !== animationFrame) {
      this.setFrame(animationFrame.name);
      this.currentFrame = animationFrame;
    }

    this.animations.update(deltaStep);
  }
}
