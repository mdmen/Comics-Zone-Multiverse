import { Image } from './Image';

export class ImageCanvas extends Image<ImageBitmap> {
  protected async create(source: HTMLCanvasElement | HTMLImageElement) {
    this.source = await createImageBitmap(source);

    this.width = this.source.width;
    this.height = this.source.height;

    this.loaded.notify(this);
  }

  destroy() {
    this.source?.close();
    super.destroy();
  }
}
