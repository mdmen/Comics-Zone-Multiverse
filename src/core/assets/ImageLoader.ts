import { Settings } from '../Settings';
import { AssetLoader } from './AssetLoader';
import { Image } from '../graphics/Image';
import {
  getFlippedImage,
  getImageFromCanvas,
  getScaledImage,
  loadImage,
  isCanvas,
} from '../utils';

interface ImageSource {
  src: string;
  scale?: number;
  flippable?: boolean;
}

async function loadScaledImage({ src, scale, flippable }: ImageSource) {
  const image = await loadImage(src);
  const settings = Settings.getInstance();

  // for WebGL render we don't need optimizations at all
  if (!settings.isWebGLRenderEngine()) {
    return new Image(image);
  }

  let element: HTMLImageElement | HTMLCanvasElement = image;
  let flippedElement: HTMLImageElement | HTMLCanvasElement | null = null;

  if (scale !== 1) {
    element = getScaledImage(image, scale);
  }

  // for Canvas render we need full set of optimizations
  if (flippable && settings.isCanvasRenderEngine()) {
    flippedElement = getFlippedImage(element);
  }

  if (settings.isHTMLRenderEngine()) {
    isCanvas(image) && (element = await getImageFromCanvas(image));
    flippedElement &&= await getImageFromCanvas(flippedElement);
  }

  return new Image(element, flippedElement, scale);
}

export class ImageLoader extends AssetLoader<typeof loadScaledImage> {
  constructor(manifest: Record<string, ImageSource>) {
    super(manifest, loadScaledImage);
  }
}
