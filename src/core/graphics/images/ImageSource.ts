export interface ImageSource<T = HTMLImageElement | HTMLCanvasElement> {
  getImage(): T | null;
  getWidth(): number;
  getHeight(): number;
  destroy(): void;
}
