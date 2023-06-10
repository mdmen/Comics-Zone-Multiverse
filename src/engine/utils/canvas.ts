import { Settings } from '../Settings';

export function createCanvas(
  width = Settings.getValue('canvasWidth'),
  height = Settings.getValue('canvasHeight')
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

export function createContext2D(
  canvas: HTMLCanvasElement,
  transparent = true
): CanvasRenderingContext2D {
  const context = canvas.getContext('2d', {
    alpha: transparent,
  });

  if (!context) {
    throw Error('Cannot create 2d context');
  }

  return context;
}
