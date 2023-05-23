import { Assets } from '../interfaces';
import { loadImage } from '../helpers';

export class ImageAssets<Names extends string> extends Assets<
  Names,
  HTMLImageElement
> {
  protected loadResource(src: string): Promise<HTMLImageElement> {
    return loadImage(src);
  }
}
