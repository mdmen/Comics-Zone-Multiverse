import type { Audio } from '../platform/Audio';

interface AudioSpriteSegment {
  start: number;
  end: number;
}

export interface AudioSpriteData<T extends string> {
  map: Record<T, AudioSpriteSegment>;
}

export class AudioSprite<Names extends string> {
  private buffer;
  private context;
  private data;

  constructor(
    context: Audio,
    buffer: AudioBuffer,
    data: AudioSpriteData<string>
  ) {
    this.context = context;
    this.buffer = buffer;
    this.data = data;
  }

  public play(name: Names): void {
    const { map } = this.data;
    const { start, end } = map[name];

    this.context.play({
      buffer: this.buffer,
      start,
      end,
    });
  }

  public stop(): void {
    this.context.stop(this.buffer);
  }
}
