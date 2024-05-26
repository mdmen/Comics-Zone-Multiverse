import { isSafari } from './browsers';
import { createCanvas, createContext2D } from './canvas';

type ImageSource = HTMLImageElement | HTMLCanvasElement | ImageBitmap;

export function getImageWidth(source: ImageSource) {
  return source instanceof Image ? source.naturalWidth : source.width;
}

export function getImageHeight(source: ImageSource) {
  return source instanceof Image ? source.naturalHeight : source.height;
}

export async function getFlippedImageCanvas(source: ImageSource) {
  const sourceWidth = getImageWidth(source);
  const sourceHeight = getImageHeight(source);

  const canvas = createCanvas(sourceWidth, sourceHeight);
  const context = createContext2D(canvas);

  context.translate(sourceWidth, 0);
  context.scale(-1, 1);
  context.drawImage(source, 0, 0);

  return canvas;
}

export async function getScaledImageSource(source: ImageSource, scale = 1) {
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

export async function extractImageFromCanvas(canvas: HTMLCanvasElement) {
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
