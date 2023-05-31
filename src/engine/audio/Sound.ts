import { BaseSound } from './BaseSound';

export class Sound extends BaseSound {
  public play(): void {
    this.source.start();
  }

  public setLoop(value = true): void {
    this.source.loop = value;
  }
}
