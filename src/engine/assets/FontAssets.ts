import { Assets } from './Assets';
import { loadImage, loadData } from './loaders';
import { type ImageFontData } from '../render/sprites/SpriteText';
import { type SpriteAsset, type SpriteSource } from './types';

export type ImageFontAsset = SpriteAsset<ImageFontData>;

export type ReturnImageFontAssets<Sources> = {
  [Key in keyof Sources]: ImageFontAsset;
};

export class FontAssets extends Assets {
  protected async loadAsset(source: SpriteSource): Promise<ImageFontAsset> {
    const { src, data: fontDataSrc } = source;
    const [image, data] = await Promise.all([
      loadImage(src),
      loadData(fontDataSrc) as unknown as Promise<ImageFontData>,
    ]);

    return { image, data };
  }

  public async load<Sources extends Record<string, unknown>>(
    sources: Sources
  ): Promise<ReturnImageFontAssets<Sources>> {
    return (await super.load(sources)) as ReturnImageFontAssets<Sources>;
  }
}
