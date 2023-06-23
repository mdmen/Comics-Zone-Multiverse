export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;

    resolve(image);
  });
}

export function loadAudio(): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    resolve(new ArrayBuffer(0));
  });
}

export function loadData(): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    resolve({ test: 'value' });
  });
}
