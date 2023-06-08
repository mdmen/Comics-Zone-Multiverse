import {
  canvasDefaultWidth,
  canvasDefaultHeight,
  canvasDefaultAntialiasing,
} from '../settings';

export function createCanvas(
  width = canvasDefaultWidth,
  height = canvasDefaultHeight
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
}

export function getContext2D(
  canvas: HTMLCanvasElement,
  isTransparent = true,
  isAntialiasing = canvasDefaultAntialiasing
): CanvasRenderingContext2D {
  const context = canvas.getContext('2d', {
    alpha: isTransparent,
  });

  if (!context) {
    throw Error('Cannot create 2d context');
  }

  context.imageSmoothingEnabled = isAntialiasing;

  return context;
}
