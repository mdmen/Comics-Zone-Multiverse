import { Logger } from '../Logger';
import type { SoundLayer } from './SoundLayer';
import type { AudioSpriteAtlas } from '../assets/AudioSpriteAtlas';
import { Sound } from './Sound';

export class SoundSprite extends Sound {
  private atlas;
  protected readonly logger = Logger.getInstance();

  constructor(buffer: AudioBuffer, audio: SoundLayer, atlas: AudioSpriteAtlas) {
    super(buffer, audio);

    this.atlas = atlas;
  }

  public playSegment(segment: string) {
    try {
      const { start, end } = this.atlas.segments[segment];
      this.node.start(0, start, end - start);

      this.startPlayingNotify();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public setLoopSegment(segment: string, loop: boolean) {
    try {
      const { start, end } = this.atlas.segments[segment];

      this.node.loop = loop;
      this.node.loopStart = start;
      this.node.loopEnd = end;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public destroy() {
    super.destroy();

    this.atlas = null as unknown as AudioSpriteAtlas;
  }
}
