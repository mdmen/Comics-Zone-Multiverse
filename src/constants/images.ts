import sketchImage from '@/assets/images/characters/sketch/sketch.webp';
import sketchData from '@/assets/images/characters/sketch/sketch.json';
import loadingStart from '@/assets/images/scenes/loading_start.webp';
import loadingFinish from '@/assets/images/scenes/loading_finish.webp';
import introEarlier from '@/assets/images/scenes/intro_earlier.webp';
import inventory from '@/assets/images/inventory.webp';

export const globalImages = {
  sketch: {
    src: sketchImage,
    data: sketchData,
  },
  inventory,
};

export const loadingSceneImages = {
  loadingStart,
  loadingFinish,
};

export const introSceneImages = {
  earlier: introEarlier,
};
