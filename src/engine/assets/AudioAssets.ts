import { Assets } from './Assets';
import { Audio } from '../audio/Audio';
import { SpriteSound, type SpriteSoundData } from '../audio/SpriteSound';
import { Sound } from '../audio/Sound';
import { loadAudio, loadData, isString } from '../../helpers';

interface SpriteLoadSource {
  src: string;
  data: string;
}

interface SpriteSource<Names extends string> {
  src: string;
  data: SpriteSoundData<Names>;
}

export class AudioAssets<
  Names extends string,
  Segments extends string
> extends Assets<Names, Sound | SpriteSound<Segments>> {
  private readonly audio;

  constructor(sources: Record<Names, string | SpriteSource<Segments>>) {
    super(sources);

    this.audio = Audio.getInstance();
  }

  protected async loadAsset(
    source: string | SpriteLoadSource
  ): Promise<Sound | SpriteSound<Segments>> {
    const context = this.audio.getContext();

    if (isString(source)) {
      const buffer = await loadAudio(source, context);
      return new Sound(buffer);
    }

    const [buffer, data] = await Promise.all([
      loadAudio(source.src, context),
      loadData(source.data) as unknown as Promise<SpriteSoundData<Segments>>,
    ]);

    return new SpriteSound(buffer, data);
  }
}
