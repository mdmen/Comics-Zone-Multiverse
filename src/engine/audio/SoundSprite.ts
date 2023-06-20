import { Playable } from './Playable';

interface Segment {
  start: number;
  end: number;
}

export interface SoundSpriteData<Names extends PrimitiveKeys = string> {
  map: Record<Names, Segment>;
}

export class SoundSprite<
  Names extends PrimitiveKeys = string
> extends Playable {
  private readonly data;

  constructor(source: AudioBufferSourceNode, data: SoundSpriteData<Names>) {
    super(source);

    this.data = data;
  }

  public play(name: Names): void {
    const { start, end } = this.data.map[name];

    this.source.start(0, start, end);
  }
}
