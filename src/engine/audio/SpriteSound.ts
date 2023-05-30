import { Audio } from './Audio';

interface Segment {
  start: number;
  end: number;
}

export interface SpriteSoundData<Names extends PrimitiveKeys = string> {
  map: Record<Names, Segment>;
}

export class SpriteSound<Names extends PrimitiveKeys = string> {
  private readonly source;
  private readonly audio;
  private readonly data;

  constructor(buffer: AudioBuffer, data: SpriteSoundData<Names>) {
    this.audio = Audio.getInstance();
    const context = this.audio.getContext();

    this.source = new AudioBufferSourceNode(context, { buffer });
    this.source.connect(context.destination);

    this.data = data;
  }

  public play(name: Names): void {
    const { start, end } = this.data.map[name];

    this.source.start(0, start, end);
  }

  public stop(): void {
    this.source.stop();
  }
}
