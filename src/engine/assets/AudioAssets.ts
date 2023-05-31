import { Assets } from './Assets';
import { Audio } from '../audio/Audio';
import { SpriteSound, type SpriteSoundData } from '../audio/SpriteSound';
import { Sound } from '../audio/Sound';
import { loadAudio, loadData } from './loaders';
import { isString } from '@/helpers';

interface SpriteSource {
  src: string;
  data: string;
}

interface SpriteData {
  src: string;
  data: SpriteSoundData;
}

type ReturnAssets<Sources> = Promise<{
  [Key in keyof Sources]: Sources[Key] extends SpriteData
    ? SpriteSound<keyof Sources[Key]['data']['map']>
    : Sound;
}>;

export class AudioAssets<
  Sources extends Record<string, unknown>
> extends Assets {
  private readonly audio;

  constructor(sources: Sources) {
    super(sources);

    this.audio = Audio.getInstance();
  }

  protected async loadAsset(
    source: string | SpriteSource
  ): Promise<Sound | SpriteSound> {
    const context = this.audio.getContext();

    if (isString(source)) {
      const buffer = await loadAudio(source, context);
      return new Sound(buffer);
    }

    const { src, data: spriteDataSrc } = source;
    const [buffer, spriteData] = await Promise.all([
      loadAudio(src, context),
      loadData(spriteDataSrc) as unknown as Promise<SpriteSoundData>,
    ]);

    return new SpriteSound(buffer, spriteData);
  }

  public async get(): ReturnAssets<Sources> {
    return (await this.retrieve()) as ReturnAssets<Sources>;
  }
}
