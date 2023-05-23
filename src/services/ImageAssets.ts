import { Assets } from '../interfaces';
import { loadImage } from '../helpers';

export class ImageAssets extends Assets<HTMLImageElement> {
  protected loadResource(src: string): Promise<HTMLImageElement> {
    return loadImage(src);
  }
}
