import { Observable } from '../../Observable';
import type { ImageSource } from './ImageSource';

type ImageElement = HTMLCanvasElement | HTMLImageElement;
type ImageSourceInput = ImageElement;

export abstract class BaseImage<T extends ImageElement>
  implements ImageSource<T>
{
  public readonly loadedEvent = new Observable<this>();
  protected image: T | null = null;
  protected width = 0;
  protected height = 0;
  public readonly scale;

  constructor(source: ImageSourceInput, scale = 1) {
    this.scale = scale;

    this.init(source);
  }

  protected abstract init(source: ImageSourceInput): void;

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getImage() {
    return this.image;
  }

  public destroy() {
    this.image = null;
    this.loadedEvent.unsubscribeAll();
  }
}
