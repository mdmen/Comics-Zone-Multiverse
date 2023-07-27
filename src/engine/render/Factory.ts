import { Image, type ImageOptions } from './Image';
import { Sprite, type SpriteOptions } from './sprites';

export class Factory {
  private constructor() {}

  public static async createImage(options: ImageOptions): Promise<Image> {
    return new Promise((resolve) => {
      const imageClass = new Image({
        ...options,
        onCreate: (image: Image) => {
          if (options.onCreate) {
            options.onCreate(image);
          }

          resolve(imageClass);
        },
      });
    });
  }

  public static async createSprite(options: SpriteOptions): Promise<Sprite> {
    return new Promise((resolve) => {
      const spriteClass = new Sprite({
        ...options,
        onCreate: (image: Image) => {
          if (options.onCreate) {
            options.onCreate(image);
          }

          resolve(spriteClass);
        },
      });
    });
  }
}
