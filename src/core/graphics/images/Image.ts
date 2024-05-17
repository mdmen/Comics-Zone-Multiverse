import { Observable } from '../../Observable';

type ImageSourceInput = HTMLCanvasElement | HTMLImageElement;
type ImageSource = ImageSourceInput | ImageBitmap;

export abstract class Image<T extends ImageSource = ImageSource> {
  public readonly loaded = new Observable<this>();
  protected source: T | null = null;
  protected width = 0;
  protected height = 0;

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

  public getSource() {
    return this.source;
  }

  public destroy() {
    this.source = null;
    this.loaded.unsubscribeAll();
  }
}
