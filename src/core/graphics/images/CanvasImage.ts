import { getImageHeight, getImageWidth, getScaledImage } from '../../utils';
import { BaseImage } from './BaseImage';

export class CanvasImage extends BaseImage<
  HTMLCanvasElement | HTMLImageElement
> {
  protected async init(source: HTMLCanvasElement | HTMLImageElement) {
    const image =
      this.scale !== 1 ? await getScaledImage(source, this.scale) : source;

    this.image = image;
    this.width = getImageWidth(image);
    this.height = getImageHeight(image);

    this.loadedEvent.notify(this);
  }
}
