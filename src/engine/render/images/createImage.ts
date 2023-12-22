import { Settings } from '../../Settings';
import { CanvasImage } from './CanvasImage';
import { HTMLImage } from './HTMLImage';
import { type Image } from './Image';

export async function createImage(image: HTMLImageElement | HTMLCanvasElement) {
  return new Promise<Image>((resolve) => {
    const ImageEntity = Settings.isDOMEngine() ? HTMLImage : CanvasImage;

    new ImageEntity(image, (image: Image) => {
      resolve(image);
    });
  });
}
