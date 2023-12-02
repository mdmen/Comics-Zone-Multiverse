import { isSafari } from './browsers';
import { createCanvas, createContext2D } from './canvas';

export async function getFlippedImage(image: HTMLImageElement) {
  const canvas = createCanvas(image.width, image.height);
  const context = createContext2D(canvas);

  context.translate(image.width, 0);
  context.scale(-1, 1);
  context.drawImage(image, 0, 0);

  return extractImageFromCanvas(canvas);
}

export async function getScaledImage(image: HTMLImageElement, scale: number) {
  if (scale === 1) return image;

  const width = Math.floor(image.width * scale);
  const height = Math.floor(image.height * scale);
  const canvas = createCanvas(width, height);
  const context = createContext2D(canvas);

  context.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    width,
    height
  );

  return extractImageFromCanvas(canvas);
}

export async function extractImageFromCanvas(canvas: HTMLCanvasElement) {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();

    const onLoad = () => {
      image.removeEventListener('load', onLoad);
      resolve(image);
    };

    image.addEventListener('load', onLoad);

    const type = isSafari() ? 'png' : 'webp';
    image.src = canvas.toDataURL(`image/${type}`, 1);
  });
}
