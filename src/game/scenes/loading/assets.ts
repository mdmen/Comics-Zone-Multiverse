import { AudioAssets, ImageLoader } from '@/core/loaders';

export async function loadGlobalAssets() {
  return {
    characters: {
      sketch: {
        image: await ImageLoader.load('characters/sketch.png'),
        audio: await AudioAssets.load('characters/sketch.mp3'),
      },
    },
  };
}
