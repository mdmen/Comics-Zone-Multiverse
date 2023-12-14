import { Settings } from '../Settings';
import { CanvasImage, HTMLImage, type Image } from './images';
import { LayerCanvas, LayerDOM, type LayerOptions } from './layers';

export function createLayer(options: LayerOptions) {
  return Settings.isDOMEngine()
    ? new LayerDOM(options)
    : new LayerCanvas(options);
}

export async function createImage(image: HTMLImageElement | HTMLCanvasElement) {
  return new Promise<Image>((resolve) => {
    const ImageEntity = Settings.isDOMEngine() ? HTMLImage : CanvasImage;

    new ImageEntity(image, (image: Image) => {
      resolve(image);
    });
  });
}
