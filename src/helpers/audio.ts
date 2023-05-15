export function loadAudio(src: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();

    audio.addEventListener('loadeddata', () => {
      resolve(audio);
    });

    audio.addEventListener('error', (event) => {
      reject(event);
    });

    audio.src = src;
  });
}
