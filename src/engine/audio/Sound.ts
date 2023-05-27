import { Audio } from './Audio';

export class Sound {
  private readonly source;
  private readonly audio;

  constructor(buffer: AudioBuffer) {
    this.audio = Audio.getInstance();

    const context = this.audio.getContext();
    this.source = new AudioBufferSourceNode(context, { buffer });
    this.source.connect(context.destination);
  }

  public play(): void {
    this.source.start();
  }

  public stop(): void {
    this.source.stop();
  }

  public setLoop(value = true): void {
    this.source.loop = value;
  }
}
