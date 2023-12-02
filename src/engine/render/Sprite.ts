import type { ImageSpriteData } from '../assets/types';
import { Picture, type PictureOptions } from './Picture';
import { SpriteAnimation } from './animations/Animation';

export interface Frame {
  name: string;
  duration?: number;
}

export interface AnimationOptions {
  name: string;
  frames: Frame[];
  infinite?: boolean;
}

export interface SpriteOptions extends PictureOptions {
  data?: ImageSpriteData;
}

export class Sprite extends Picture {
  private readonly data;
  private animation!: SpriteAnimation;

  constructor(options: SpriteOptions) {
    super(options);

    const { data } = options;
    this.data = data;
  }

  update(step: number) {
    super.update(step);
    this.animation && this.updateAnimation();
  }
}
