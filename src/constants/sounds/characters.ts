import sketchSprite from '../../assets/audio/sketch/sprite.mp3';
import sketchSpriteMap from '../../assets/audio/sketch/sprite.json';

export const sketchSounds = {
  sketch: {
    src: sketchSprite,
    data: sketchSpriteMap,
  },
};

export const charactersSounds = {
  test: sketchSprite,
  ...sketchSounds,
};
