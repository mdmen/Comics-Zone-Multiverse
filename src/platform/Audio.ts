import { Logger } from 'interfaces';

export class Audio<SoundNames extends string> {
  private readonly sounds;

  constructor(sounds: Record<SoundNames, HTMLAudioElement>) {
    this.sounds = sounds;
  }

  public play(key: SoundNames): void {
    try {
      this.sounds[key].play();
    } catch (error) {
      Logger.error(error);
    }
  }

  public stop(key: SoundNames): void {
    const sound = this.sounds[key];

    sound.pause();
    sound.currentTime = 0;
  }
}
