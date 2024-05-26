import { Settings } from '../../Settings';
import { ImageSourceCanvas } from './ImageSourceCanvas';
import { ImageSourceHTML } from './ImageSourceHTML';
import type { ImageSourceInput } from './ImageSource';

export async function createImage(source: ImageSourceInput) {
  return new Promise<ImageSourceCanvas | ImageSourceHTML>((resolve) => {
    const ImageClass = Settings.isHTMLRenderEngine()
      ? ImageSourceHTML
      : ImageSourceCanvas;
    const image = new ImageClass(source);

    image.loadedEvent.subscribe(() => {
      resolve(image);
    });
  });
}
