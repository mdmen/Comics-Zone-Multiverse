import { Image, type ImageOptions } from './Image';
import { Sprite, type SpriteOptions } from './sprites';

export class Factory {
  private constructor() {}

  public static async createImage(options: ImageOptions): Promise<Image> {
    return new Promise((resolve) => {
      const entity = new Image({
        ...options,
        onCreate: (image: Image) => {
          if (options.onCreate) {
            options.onCreate(image);
          }

          resolve(entity);
        },
      });
    });
  }

  public static async createSprite(options: SpriteOptions): Promise<Sprite> {
    return new Promise((resolve) => {
      const entity = new Sprite({
        ...options,
        onCreate: (image: Image) => {
          if (options.onCreate) {
            options.onCreate(image);
          }

          resolve(entity);
        },
      });
    });
  }
}
