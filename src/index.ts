import { onDOMReady } from './helpers/dom';

import './assets/styles/index.css';
import { AudioAssets } from './engine/assets/AudioAssets';
import { charactersSounds } from './constants/sounds';
import { Sounds } from './engine';
// import { characterImages } from './constants/images';
// import { ImageAssets } from './engine/assets/ImageAssets';

onDOMReady(async () => {
  const audioAssets = new AudioAssets(charactersSounds);
  const soundsAssets = await audioAssets.get();
  const sounds = new Sounds(soundsAssets);

  sounds.play('sketch', 'ahh');

  // const assets = new ImageAssets(characterImages);
  // const images = await assets.get();
});
