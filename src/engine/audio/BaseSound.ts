import { Audio } from './Audio';

export abstract class BaseSound {
  protected readonly source;

  constructor(buffer: AudioBuffer) {
    const audio = Audio.getInstance();
    const context = audio.getContext();

    this.source = new AudioBufferSourceNode(context, { buffer });
    this.source.connect(context.destination);
  }

  public abstract play(...args: unknown[]): void;

  public stop(): void {
    this.source.stop();
  }
}
