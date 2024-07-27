import { Settings } from '../../Settings';

export function createContext2D(canvas: HTMLCanvasElement | OffscreenCanvas) {
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
