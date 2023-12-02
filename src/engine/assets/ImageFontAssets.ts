import { Assets } from './Assets';
import { loadImage, loadData } from './loaders';
import { type ReturnImageFontAssets, type SpriteSource } from './types';

export class ImageFontAssets extends Assets {
  protected async loadAsset(source: SpriteSource<string>) {
    const [image, data] = await Promise.all([
      loadImage(source.url),
      loadData(source.data),
    ]);

    return { image, data };
  }

  async load<Sources extends Record<string, unknown>>(sources: Sources) {
    return super.load(sources) as ReturnImageFontAssets<Sources>;
  }
}
