import { Settings } from '../Settings';

export function createCanvas(
  width = Settings.get('canvasWidth'),
  height = Settings.get('canvasHeight')
) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);

  return canvas;
}

export function createContext2D(
  canvas: HTMLCanvasElement,
  transparent = true,
  antialiasing = Settings.get('antialiasing')
) {
  const context = canvas.getContext('2d', {
    alpha: transparent,
  });

  if (!context) {
    throw Error('Cannot create 2d context');
  }

  context.imageSmoothingEnabled = antialiasing;
  !antialiasing && (context.textRendering = 'optimizeSpeed');

  return context;
}
