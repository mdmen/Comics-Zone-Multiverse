interface Segment {
  start: number;
  end: number;
}

export interface SoundSpriteData<Names extends PrimitiveKeys = string> {
  map: Record<Names, Segment>;
}

export class SoundSprite<Names extends PrimitiveKeys = string> {
  private readonly source;
  private readonly data;

  constructor(source: AudioBufferSourceNode, data: SoundSpriteData<Names>) {
    this.source = source;
    this.data = data;
  }

  public play(name: Names): void {
    const { start, end } = this.data.map[name];

    this.source.start(0, start, end);
  }

  public stop(): void {
    this.source.stop();
  }

  public getSource(): AudioBufferSourceNode {
    return this.source;
  }
}
