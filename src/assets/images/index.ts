import sketchImage from './characters/sketch/sketch.webp';
import sketchData from './characters/sketch/sketch.json';
import loadingStart from './scenes/loading_start.webp';
import loadingFinish from './scenes/loading_finish.webp';
import introEarlier from './scenes/intro_earlier.webp';
import inventory from './misc/inventory.webp';

export const globalImages = {
  sketch: {
    url: sketchImage,
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
