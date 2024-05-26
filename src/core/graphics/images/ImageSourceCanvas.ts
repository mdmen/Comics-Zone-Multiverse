import { ImageSource, type ImageSourceInput } from './ImageSource';

export class ImageSourceCanvas extends ImageSource<ImageBitmap> {
  protected async create(source: ImageSourceInput) {
    this.image = await createImageBitmap(source);

    this.width = this.image.width;
    this.height = this.image.height;

    this.loaded = true;
    this.loadedEvent.notify(this);
  }

  destroy() {
    this.image?.close();
    super.destroy();
  }
}
