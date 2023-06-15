import { Assets } from './Assets';
import { type SoundSpriteData } from '../audio/SoundSprite';
import { loadAudio, loadData } from '../utils/loaders';
import { isString } from '../utils';

interface SpriteSource {
  src: string;
  data: string;
}

interface SpriteData {
  src: string;
  data: SoundSpriteData;
}

export type AudioAsset = ArrayBuffer;

export interface AudioSpriteAsset<Names extends PrimitiveKeys = string> {
  buffer: AudioAsset;
  data: SoundSpriteData<Names>;
}

type ReturnAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends SpriteData
    ? AudioSpriteAsset<keyof Sources[Key]['data']['map']>
    : ArrayBuffer;
};

export class AssetsAudio<
  Sources extends Record<string, unknown>
> extends Assets {
  constructor(sources: Sources) {
    super(sources);
  }

  protected async loadAsset(
    source: string | SpriteSource
  ): Promise<AudioAsset | AudioSpriteAsset> {
    if (isString(source)) {
      return await loadAudio(source);
    }

    const { src, data: spriteDataSrc } = source;
    const [buffer, data] = await Promise.all([
      loadAudio(src),
      loadData(spriteDataSrc) as unknown as Promise<SoundSpriteData>,
    ]);

    return { buffer, data };
  }

  public async get(): Promise<ReturnAssets<Sources>> {
    return (await this.retrieve()) as ReturnAssets<Sources>;
  }
}
