import { isSafari } from '@/helpers';
import { canvasDefaultSmoothing } from '../settings';

export function getReversedImage(
  image: HTMLImageElement,
  isTransparent = true,
  isSmoothing = canvasDefaultSmoothing
): HTMLImageElement {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const context = canvas.getContext('2d', {
    alpha: isTransparent,
  });

  if (!context) {
    throw Error('Cannot create context');
  }

  context.imageSmoothingEnabled = isSmoothing;

  context.save();
  context.translate(image.width, 0);
  context.scale(-1, 1);
  context.drawImage(image, 0, 0);
  context.restore();

  return extractImageFromCanvas(canvas);
}

export function extractImageFromCanvas(
  canvas: HTMLCanvasElement
): HTMLImageElement {
  const image = new Image();

  const type = isSafari() ? 'png' : 'webp';
  image.src = canvas.toDataURL(`image/${type}`);

  return image;
}
