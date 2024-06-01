import { SoundSource } from './SoundSource';

export class Sound extends SoundSource {
  public play() {
    try {
      this.sourceNode.start();

      this.startPlayingNotify();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public setLoop(loop: boolean) {
    this.sourceNode.loop = loop;
  }
}
