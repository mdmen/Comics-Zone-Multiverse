import { Loader } from './Loader';
import { loadImage } from './loaders';

export class ImageLoader extends Loader<typeof loadImage> {
  constructor(manifest: Record<string, string>) {
    super(manifest, loadImage);
  }
}
