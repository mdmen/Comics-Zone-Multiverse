import { Image } from './Image';

type CreateCallback = (image: Image) => void;

export class CanvasImage extends Image {
  protected source!: ImageBitmap;

  constructor(image: CanvasImageSource, onCreate?: CreateCallback) {
    super();

    this.create(image, onCreate);
  }

  private async create(image: CanvasImageSource, onCreate?: CreateCallback) {
    this.source = await createImageBitmap(image);
    this.loaded = true;

    onCreate?.(this);
  }

  getWidth() {
    return this.source.width;
  }

  getHeight() {
    return this.source.height;
  }

  getSource() {
    return this.source;
  }

  destroy() {
    this.source.close();
    this.source = null as unknown as ImageBitmap;
  }
}
