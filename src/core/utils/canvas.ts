import { Settings } from '../Settings';

export function isCanvas(source: unknown): source is HTMLCanvasElement {
  return source instanceof HTMLCanvasElement;
}

export function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);

  return canvas;
}

export function createContext2D(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d', {
    alpha: true,
  });

  if (!context) {
    throw Error('Cannot create 2d context');
  }

  context.imageSmoothingEnabled = Settings.getInstance().isAntialiasing();

  return context;
}
