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

export async function loadAudio(
  src: string,
  context: AudioContext
): Promise<AudioBuffer> {
  const response = await fetch(src);

  if (!response.ok) {
    throw Error('Failed to load audio');
  }

  const arrayBuffer = await response.arrayBuffer();
  return await context.decodeAudioData(arrayBuffer);
}

export async function loadData(src: string): Promise<Record<string, unknown>> {
  const response = await fetch(src);

  if (!response.ok) {
    throw Error('Failed to load data');
  }

  return await response.json();
}
