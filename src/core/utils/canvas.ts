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

export function createContext2D(
  canvas: HTMLCanvasElement,
  antialiasing = Settings.isAntialiasing(),
  transparent = true
) {
  const context = canvas.getContext('2d', {
    alpha: transparent,
  });

  if (!context) {
    throw Error('Cannot create 2d context');
  }

  context.imageSmoothingEnabled = antialiasing;

  return context;
}
