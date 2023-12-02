import { Image } from './Image';

export class CanvasImage extends Image {
  private source!: ImageBitmap;
  private loaded = false;

  constructor(image: HTMLImageElement) {
    super();

    this.create(image);
  }

  private async create(image: HTMLImageElement) {
    this.source = await createImageBitmap(image);
    this.loaded = true;
  }

  getSource() {
    return this.source;
  }

  getWidth() {
    return this.source.width;
  }

  getHeight() {
    return this.source.height;
  }

  isLoaded() {
    return this.loaded;
  }

  destroy() {
    this.source.close();
    this.source = null as unknown as ImageBitmap;
  }
}
