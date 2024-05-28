import { BaseImage } from './BaseImage';
import { getImageFromCanvas, getScaledImage, isCanvas } from '../../utils';

export class HTMLImage extends BaseImage<HTMLImageElement> {
  protected async init(source: HTMLCanvasElement | HTMLImageElement) {
    let image = source;

    if (this.scale !== 1) {
      image = await getScaledImage(source, this.scale);
    }

    if (isCanvas(image)) {
      image = await getImageFromCanvas(image);
    }

    this.image = image;
    this.width = image.naturalWidth;
    this.height = image.naturalHeight;

    this.loadedEvent.notify(this);
  }
}
