import { Settings } from '../Settings';
import { LayerCanvas, LayerDOM, type LayerOptions, type Layer } from './layers';

export class Factory {
  private constructor() {}

  static createLayer(options: LayerOptions): Layer {
    return Settings.isDOMEngine()
      ? new LayerDOM(options)
      : new LayerCanvas(options);
  }

  // static async createImage(options: ImageOptions): Promise<Image> {
  //   return new Promise((resolve) => {
  //     const entity = new Image({
  //       ...options,
  //       onCreate: (image: Image) => {
  //         if (options.onCreate) {
  //           options.onCreate(image);
  //         }

  //         resolve(entity);
  //       },
  //     });
  //   });
  // }

  // static async createSprite(options: SpriteOptions): Promise<Sprite> {
  //   return new Promise((resolve) => {
  //     const entity = new Sprite({
  //       ...options,
  //       onCreate: (image: Image) => {
  //         if (options.onCreate) {
  //           options.onCreate(image);
  //         }

  //         resolve(entity);
  //       },
  //     });
  //   });
  // }
}
