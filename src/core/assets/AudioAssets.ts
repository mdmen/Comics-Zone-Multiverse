import { Assets } from './Assets';
import { loadAudio, loadData } from '../utils/loaders';
import {
  SoundLayer,
  Sound,
  SoundSprite,
  type SoundSpriteAtlas,
} from '../audio';

interface AudioAssetsSource {
  src: string;
  atlas?: string;
}

export type AudioAssetsItems<Manifest> = {
  [K in keyof Manifest]: Manifest[K] extends AudioAssetsSource
    ? Manifest[K]['atlas'] extends string
      ? SoundSprite
      : Sound
    : never;
};

export class AudioAssets<
  T extends Record<string, AudioAssetsSource>
> extends Assets<AudioAssetsItems<T>> {
  private readonly layer;

  constructor(manifest: T, layer: SoundLayer) {
    super(manifest);

    this.layer = layer;
  }

  protected async loadAsset({ src, atlas }: AudioAssetsSource) {
    const context = this.layer.getContext();

    const getAudioBuffer = async (src: string) => {
      const arrayBuffer = await loadAudio(src);
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      return audioBuffer;
    };

    if (!atlas) {
      const audioBuffer = await getAudioBuffer(src);
      return new Sound(audioBuffer, this.layer);
    }

    const [audioBuffer, atlasSheet] = await Promise.all([
      getAudioBuffer(src),
      loadData(atlas) as Promise<SoundSpriteAtlas>,
    ]);

    return new SoundSprite(audioBuffer, this.layer, atlasSheet);
  }
}
