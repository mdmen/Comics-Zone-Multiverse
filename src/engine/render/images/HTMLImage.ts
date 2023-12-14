import { Image } from './Image';
import { extractImageFromCanvas } from '../../utils';

type ImageSourceInput = HTMLCanvasElement | HTMLImageElement;
type CreateCallback = (image: Image) => void;

export class HTMLImage extends Image {
  protected source!: HTMLImageElement;

  constructor(image: ImageSourceInput, onCreate?: CreateCallback) {
    super();

    this.create(image, onCreate);
  }

  private async create(image: ImageSourceInput, onCreate?: CreateCallback) {
    if (image instanceof HTMLCanvasElement) {
      this.source = await extractImageFromCanvas(image);
    } else {
      this.source = image;
    }

    this.loaded = true;

    onCreate?.(this);
  }

  getWidth() {
    return this.source.naturalWidth;
  }

  getHeight() {
    return this.source.naturalHeight;
  }

  getSource() {
    return this.source;
  }

  destroy() {
    this.source = null as unknown as HTMLImageElement;
  }
}
