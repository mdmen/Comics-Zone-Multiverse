import { Assets } from './Assets';
import { isString } from '../utils';
import { loadImage, loadData } from './loaders';
import { type SpriteImageData } from '../render/sprites/Sprite';
import {
  type SpriteSource,
  type SpriteResource,
  type SpriteAsset,
} from './types';

type ImageSpriteResource = SpriteResource<SpriteImageData>;
type SpriteImageAsset = SpriteAsset<SpriteImageData>;

export type ReturnImageAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends ImageSpriteResource
    ? SpriteImageAsset
    : HTMLImageElement;
};

export class ImageAssets extends Assets {
  protected async loadAsset(
    source: string | SpriteSource
  ): Promise<HTMLImageElement | SpriteImageAsset> {
    if (isString(source)) {
      return await loadImage(source);
    }

    const { src, data: spriteDataSrc } = source;
    const [image, data] = await Promise.all([
      loadImage(src),
      loadData(spriteDataSrc) as unknown as Promise<SpriteImageData>,
    ]);

    return { image, data };
  }

  public async load<Sources extends Record<string, unknown>>(
    sources: Sources
  ): Promise<ReturnImageAssets<Sources>> {
    return (await super.load(sources)) as ReturnImageAssets<Sources>;
  }
}
