import type { Audio } from '../platform/Audio';

interface Segment {
  start: number;
  end: number;
}

export interface SpriteData<Names extends string> {
  map: Record<Names, Segment>;
}

export class AudioSprite<Names extends string> {
  private buffer;
  private context;
  private data;

  constructor(context: Audio, buffer: AudioBuffer, data: SpriteData<Names>) {
    this.context = context;
    this.buffer = buffer;
    this.data = data;
  }

  public play(name: Names): void {
    const { start, end } = this.data.map[name];

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
