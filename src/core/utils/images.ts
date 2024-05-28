import { isSafari } from './browsers';
import { createCanvas, createContext2D, isCanvas } from './canvas';

export function getImageWidth(source: HTMLImageElement | HTMLCanvasElement) {
  return isCanvas(source) ? source.width : source.naturalWidth;
}

export function getImageHeight(source: HTMLImageElement | HTMLCanvasElement) {
  return isCanvas(source) ? source.height : source.naturalHeight;
}

export async function getFlippedImageCanvas(
  source: HTMLImageElement | HTMLCanvasElement
) {
  const sourceWidth = getImageWidth(source);
  const sourceHeight = getImageHeight(source);

  const canvas = createCanvas(sourceWidth, sourceHeight);
  const context = createContext2D(canvas);

  context.translate(sourceWidth, 0);
  context.scale(-1, 1);
  context.drawImage(source, 0, 0);

  return canvas;
}

export async function getScaledImage(
  source: HTMLImageElement | HTMLCanvasElement,
  scale = 1
) {
  if (scale === 1) return source;

  const sourceWidth = getImageWidth(source);
  const sourceHeight = getImageHeight(source);

  const width = Math.floor(sourceWidth * scale);
  const height = Math.floor(sourceHeight * scale);
  const canvas = createCanvas(width, height);
  const context = createContext2D(canvas);

  context.drawImage(
    source,
    0,
    0,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height
  );

  return canvas;
}

export async function getImageFromCanvas(canvas: HTMLCanvasElement) {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();

    image.addEventListener(
      'load',
      () => {
        resolve(image);
      },
      { once: true }
    );

    const type = isSafari() ? 'png' : 'webp';
    image.src = canvas.toDataURL(`image/${type}`, 1);
  });
}
