import { Settings } from '../Settings';

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
    throw Error('Failed to create 2d context');
  }

  const antialiasing = Settings.getInstance().isAntialiasing();
  context.imageSmoothingEnabled = antialiasing;
  !antialiasing && (context.textRendering = 'optimizeSpeed');

  return context;
}
