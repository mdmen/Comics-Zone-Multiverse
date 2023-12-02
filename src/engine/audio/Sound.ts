export class Sound {
  protected source;

  constructor(source: AudioBufferSourceNode) {
    this.source = source;
  }

  play(segment?: string): void;
  play() {
    this.source.start();
  }

  stop() {
    this.source.stop();
  }

  getSource() {
    return this.source;
  }

  destroy() {
    this.stop();

    this.source.disconnect();
    this.source = null as unknown as AudioBufferSourceNode;
  }
}
