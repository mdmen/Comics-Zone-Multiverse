export class Sound {
  private readonly source;

  constructor(source: AudioBufferSourceNode) {
    this.source = source;
  }

  public play(): void {
    this.source.start();
  }

  public stop(): void {
    this.source.stop();
  }

  public getSource(): AudioBufferSourceNode {
    return this.source;
  }
}
