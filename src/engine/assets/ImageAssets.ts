import { Assets } from './Assets';
import { isString } from '../utils';
import { loadImage, loadData } from './loaders';
import type { SpriteSource, ReturnImageAssets } from './types';

export class ImageAssets extends Assets {
  protected async loadAsset(source: string | SpriteSource<string>) {
    if (isString(source)) {
      return loadImage(source);
    }

    const [image, data] = await Promise.all([
      loadImage(source.url),
      loadData(source.data),
    ]);

    return { image, data };
  }

  async load<Sources extends Record<string, unknown>>(sources: Sources) {
    return super.load(sources) as ReturnImageAssets<Sources>;
  }
}
