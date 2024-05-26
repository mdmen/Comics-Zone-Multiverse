import { ImageSource, type ImageSourceInput } from './ImageSource';
import { extractImageFromCanvas } from '../../utils';

export class ImageSourceHTML extends ImageSource<HTMLImageElement> {
  protected async create(source: ImageSourceInput) {
    if (source instanceof HTMLCanvasElement) {
      this.image = await extractImageFromCanvas(source);
    } else {
      this.image = source;
    }

    this.width = this.image.naturalWidth;
    this.height = this.image.naturalHeight;

    this.loaded = true;
    this.loadedEvent.notify(this);
  }
}
