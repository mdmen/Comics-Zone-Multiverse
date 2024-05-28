import { Settings } from '../../Settings';
import { CanvasImage } from './CanvasImage';
import { HTMLImage } from './HTMLImage';
import type { ImageSource } from './ImageSource';

export async function createImage(
  source: HTMLCanvasElement | HTMLImageElement,
  scale = 1
) {
  return new Promise<ImageSource>((resolve) => {
    const ImageClass = Settings.isHTMLRenderEngine() ? HTMLImage : CanvasImage;
    const image = new ImageClass(source, scale);

    image.loadedEvent.subscribe(() => {
      resolve(image);
    });
  });
}
