import { Image } from './Image';
import { extractImageFromCanvas } from '../../utils';

export class ImageHTML extends Image<HTMLImageElement> {
  protected async create(source: HTMLCanvasElement | HTMLImageElement) {
    if (source instanceof HTMLCanvasElement) {
      this.source = await extractImageFromCanvas(source);
    } else {
      this.source = source;
    }

    this.width = this.source.naturalWidth;
    this.height = this.source.naturalHeight;

    this.loaded.notify(this);
  }
}
