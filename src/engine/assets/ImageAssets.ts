import { Assets } from './Assets';
import { isString } from '../utils';
import { loadImage, loadData } from './loaders';
import type { SpriteImageData } from '../render/sprites/Sprite';

interface SpriteSource {
  src: string;
  data: string;
}

interface SpriteResource {
  src: string;
  data: SpriteImageData;
}

export interface SpriteImageAsset {
  image: HTMLImageElement;
  data: SpriteImageData;
}

export type ReturnImageAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends SpriteResource
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
