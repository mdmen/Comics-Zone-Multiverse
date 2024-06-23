import { Settings } from '../Settings';
import {
  getFlippedImage,
  getImageFromCanvas,
  getImageHeight,
  getImageWidth,
  getScaledImage,
  isCanvas,
} from '../utils';

type ImageElement = HTMLImageElement | HTMLCanvasElement;

export class Image {
  private readonly settings = Settings.getInstance();
  private imageElement: ImageElement | null = null;
  private flippedImageElement: ImageElement | null = null;
  private width = 0;
  private height = 0;

  constructor(image: HTMLImageElement, scale = 1, flippable = false) {
    this.create(image, scale, flippable);
  }

  private async create(image: HTMLImageElement, scale = 1, flippable = false) {
    if (this.settings.isWebGLRenderEngine()) {
      this.imageElement = image;
      this.width = image.clientWidth;
      this.height = image.clientHeight;
      return;
    }

    let imageElement: ImageElement = image;
    let flippedImageElement: ImageElement | null = null;

    if (scale !== 1) {
      imageElement = await getScaledImage(imageElement, scale);
    }

    if (flippable && this.settings.isCanvasRenderEngine()) {
      flippedImageElement = await getFlippedImage(imageElement);
    }

    if (this.settings.isHTMLRenderEngine() && isCanvas(imageElement)) {
      imageElement = await getImageFromCanvas(imageElement);
    }

    this.width = getImageWidth(imageElement);
    this.height = getImageHeight(imageElement);

    this.imageElement = imageElement;
    this.flippedImageElement = flippedImageElement;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getImageElement() {
    return this.imageElement;
  }

  public getFlippedImageElement() {
    return this.flippedImageElement;
  }
}
