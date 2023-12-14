export abstract class Image {
  protected loaded = false;

  abstract getWidth(): number;
  abstract getHeight(): number;
  abstract destroy(): void;
  abstract getSource(): CanvasImageSource;

  isLoaded() {
    return this.loaded;
  }
}
