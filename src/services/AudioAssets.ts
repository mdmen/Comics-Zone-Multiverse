import { Assets } from '../interfaces';
import { Audio } from '../platform/Audio';
import { AudioSprite, type AudioSpriteData } from '../entities/AudioSprite';
import { loadAudio, loadData, isString } from '../helpers';

interface SpriteSource {
  src: string;
  map: string;
}

export class AudioAssets extends Assets<AudioBuffer | AudioSprite<string>> {
  private readonly audio;

  constructor(sources: Record<string, unknown>, audio: Audio) {
    super(sources);

    this.audio = audio;
  }

  protected async loadResource(
    source: string | SpriteSource
  ): Promise<AudioBuffer | AudioSprite<string>> {
    const context = this.audio.getContext();

    if (isString(source)) {
      return loadAudio(source, context);
    }

    const [buffer, map] = await Promise.all([
      loadAudio(source.src, context),
      loadData(source.map) as unknown as Promise<AudioSpriteData<string>>,
    ]);

    return new AudioSprite(this.audio, buffer, map);
  }
}
