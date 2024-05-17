import { Settings } from '../../Settings';
import { ImageCanvas } from './ImageCanvas';
import { ImageHTML } from './ImageHTML';
import type { Image } from './Image';

export async function createImage(
  source: HTMLImageElement | HTMLCanvasElement
) {
  return new Promise<Image>((resolve) => {
    const ImageClass = Settings.isHTMLRenderEngine() ? ImageHTML : ImageCanvas;
    const image = new ImageClass(source);

    image.loaded.subscribe({
      listen: () => {
        resolve(image);
      },
    });
  });
}
