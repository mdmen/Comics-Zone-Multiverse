import { Assets } from '../interfaces';
import { loadImage } from '../helpers';

export class Images extends Assets<HTMLImageElement> {
  protected loadResource(src: string): Promise<HTMLImageElement> {
    return loadImage(src);
  }
}
