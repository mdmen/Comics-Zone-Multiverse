export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const onError = (event: Event) => {
      reject(event);
    };

    image.addEventListener(
      'load',
      () => {
        image.removeEventListener('error', onError);

        resolve(image);
      },
      { once: true }
    );
    image.addEventListener('error', onError);

    image.src = src;
  });
}

async function fetchResource(src: string) {
  const response = await fetch(src);

  if (!response.ok) {
    throw Error(`Failed to load ${src}`);
  }

  return response;
}

export async function loadAudio(src: string) {
  const response = await fetchResource(src);
  return response.arrayBuffer();
}

export async function loadData(src: string): Promise<Record<string, unknown>> {
  const response = await fetchResource(src);
  return response.json();
}
