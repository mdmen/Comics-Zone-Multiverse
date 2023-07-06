import { Assets } from './Assets';
import { type SoundSpriteData } from '../audio/SoundSprite';
import { isString } from '../utils';
import { loadAudio, loadData } from './loaders';

interface SpriteSource {
  src: string;
  data: string;
}

interface SpriteResource {
  src: string;
  data: SoundSpriteData;
}

export type AudioAsset = ArrayBuffer;

export interface AudioSpriteAsset<Names extends PrimitiveKeys = string> {
  buffer: AudioAsset;
  data: SoundSpriteData<Names>;
}

export type ReturnAudioAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends SpriteResource
    ? AudioSpriteAsset<keyof Sources[Key]['data']['map']>
    : ArrayBuffer;
};

export class AudioAssets extends Assets {
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

  public async load<Sources extends Record<string, unknown>>(
    sources: Sources
  ): Promise<ReturnAudioAssets<Sources>> {
    return (await super.load(sources)) as ReturnAudioAssets<Sources>;
  }
}
