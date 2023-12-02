import { Assets } from './Assets';
import { isString } from '../utils';
import { loadAudio, loadData } from './loaders';
import type { SpriteSource, ReturnAudioAssets } from './types';

export class AudioAssets extends Assets {
  protected async loadAsset(source: string | SpriteSource<string>) {
    if (isString(source)) {
      return loadAudio(source);
    }

    const [buffer, data] = await Promise.all([
      loadAudio(source.url),
      loadData(source.data),
    ]);

    return { buffer, data };
  }

  async load<Sources extends Record<string, unknown>>(sources: Sources) {
    return super.load(sources) as ReturnAudioAssets<Sources>;
  }
}
