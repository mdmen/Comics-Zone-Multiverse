import { Assets } from '../interfaces';
import { loadAudio } from '../helpers';

export class Sounds extends Assets<HTMLAudioElement> {
  protected loadResource(src: string): Promise<HTMLAudioElement> {
    return loadAudio(src);
  }
}
