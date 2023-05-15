export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.addEventListener('error', (event) => {
      reject(event);
    });

    image.src = src;
  });
}
