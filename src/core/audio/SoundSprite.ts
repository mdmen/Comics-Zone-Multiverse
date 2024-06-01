import type { SoundLayer } from './SoundLayer';
import type { SoundSpriteAtlas } from './SoundSpriteAtlas';
import { SoundSource } from './SoundSource';

export class SoundSprite extends SoundSource {
  private atlas;

  constructor(buffer: AudioBuffer, layer: SoundLayer, atlas: SoundSpriteAtlas) {
    super(buffer, layer);

    this.atlas = atlas;
  }

  private checkSegment(segment: string) {
    if (!this.atlas.segments[segment]) {
      throw Error(`Sound sprite segment "${segment}" not found`);
    }
  }

  public play(segment: string) {
    try {
      this.checkSegment(segment);

      const { start, end } = this.atlas.segments[segment];
      this.sourceNode.start(0, start, end - start);

      this.startPlayingNotify();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public setLoop(segment: string, loop: boolean) {
    try {
      this.checkSegment(segment);

      const { start, end } = this.atlas.segments[segment];

      this.sourceNode.loop = loop;
      this.sourceNode.loopStart = start;
      this.sourceNode.loopEnd = end;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public destroy() {
    super.destroy();

    this.atlas = null as unknown as SoundSpriteAtlas;
  }
}
