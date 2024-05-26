import { CANVAS_WIDTH, CANVAS_HEIGHT, ANTIALIASING } from '../config';

export function createCanvas(width = CANVAS_WIDTH, height = CANVAS_HEIGHT) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.floor(width);
  canvas.height = Math.floor(height);

  return canvas;
}

export function createContext2D(
  canvas: HTMLCanvasElement,
  antialiasing = ANTIALIASING,
  transparent = true
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
