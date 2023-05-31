import { BaseSound } from './BaseSound';

interface Segment {
  start: number;
  end: number;
}

export interface SpriteSoundData<Names extends PrimitiveKeys = string> {
  map: Record<Names, Segment>;
}

export class SpriteSound<
  Names extends PrimitiveKeys = string
> extends BaseSound {
  private readonly data;

  constructor(buffer: AudioBuffer, data: SpriteSoundData<Names>) {
    super(buffer);

    this.data = data;
  }

  public play(name: Names): void {
    const { start, end } = this.data.map[name];

    this.source.start(0, start, end);
  }
}
