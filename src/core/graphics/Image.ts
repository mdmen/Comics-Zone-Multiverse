import { getImageHeight, getImageWidth } from '../utils';

type ImageElement = HTMLImageElement | HTMLCanvasElement;

export class Image {
  public readonly element: ImageElement | null = null;
  public readonly flippedElement: ImageElement | null = null;
  public readonly width;
  public readonly height;
  public readonly scale;

  constructor(
    element: ImageElement,
    flippedElement: ImageElement | null = null,
    scale = 1
  ) {
    this.element = element;
    this.flippedElement = flippedElement;
    this.scale = scale;
    this.width = getImageWidth(element);
    this.height = getImageHeight(element);
  }
}
