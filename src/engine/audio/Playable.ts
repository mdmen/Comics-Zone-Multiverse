export abstract class Playable {
  protected readonly source;

  constructor(source: AudioBufferSourceNode) {
    this.source = source;
  }

  public abstract play(...args: unknown[]): void;

  public stop(): void {
    this.source.stop();
  }

  public getSource(): AudioBufferSourceNode {
    return this.source;
  }
}
