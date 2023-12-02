export abstract class Image {
  abstract getSource(): CanvasImageSource;
  abstract getWidth(): number;
  abstract getHeight(): number;
  abstract isLoaded(): boolean;
  abstract destroy(): void;
}
