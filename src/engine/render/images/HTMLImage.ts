import { Image } from './Image';

export class HTMLImage extends Image {
  private source;

  constructor(image: HTMLImageElement) {
    super();

    this.source = image;
  }

  getSource() {
    return this.source;
  }

  getWidth() {
    return this.source.naturalWidth;
  }

  getHeight() {
    return this.source.naturalHeight;
  }

  isLoaded() {
    return true;
  }

  destroy() {
    this.source = null as unknown as HTMLImageElement;
  }
}
