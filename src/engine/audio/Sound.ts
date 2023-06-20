import { Playable } from './Playable';

export class Sound extends Playable {
  public play(): void {
    this.source.start();
  }
}
