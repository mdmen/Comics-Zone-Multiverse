import { Assets } from './Assets';
import { loadImage } from '../../helpers';

export class ImageAssets<Names extends string> extends Assets<
  Names,
  HTMLImageElement
> {
  protected loadAsset(src: string): Promise<HTMLImageElement> {
    return loadImage(src);
  }
}
