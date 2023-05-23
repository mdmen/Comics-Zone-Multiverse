import { Assets } from '../interfaces';
import { Audio } from '../platform/Audio';
import { AudioSprite, type SpriteData } from '../entities/AudioSprite';
import { loadAudio, loadData, isString } from '../helpers';

interface SpriteLoadSource {
  src: string;
  data: string;
}

interface SpriteSource<Names extends string> {
  src: string;
  data: SpriteData<Names>;
}

export class AudioAssets<
  Names extends string,
  Segments extends string
> extends Assets<Names, AudioBuffer | AudioSprite<Segments>> {
  private readonly audio;

  constructor(
    sources: Record<Names, string | SpriteSource<Segments>>,
    audio: Audio
  ) {
    super(sources);

    this.audio = audio;
  }

  protected async loadResource(
    source: string | SpriteLoadSource
  ): Promise<AudioBuffer | AudioSprite<Segments>> {
    const context = this.audio.getContext();

    if (isString(source)) {
      return loadAudio(source, context);
    }

    const [buffer, data] = await Promise.all([
      loadAudio(source.src, context),
      loadData(source.data) as unknown as Promise<SpriteData<Segments>>,
    ]);

    return new AudioSprite(this.audio, buffer, data);
  }
}
