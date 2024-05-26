import { Observable } from '../../Observable';

export type ImageSourceInput = HTMLCanvasElement | HTMLImageElement;

export abstract class ImageSource<T> {
  public readonly loadedEvent = new Observable<this>();
  protected image: T | null = null;
  protected width = 0;
  protected height = 0;
  protected loaded = false;

  constructor(source: ImageSourceInput) {
    this.create(source);
  }

  protected abstract create(source: ImageSourceInput): Promise<void>;

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getImage() {
    return this.image;
  }

  public isLoaded() {
    return this.loaded;
  }

  public destroy() {
    this.image = null;
    this.loadedEvent.unsubscribeAll();
  }
}
