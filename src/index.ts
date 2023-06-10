import { onDOMReady } from './helpers/dom';

import './assets/styles/index.css';
import { AssetsAudio } from './engine/assets/AssetsAudio';
import { charactersSounds } from './constants/sounds';
import { Sounds } from './engine';
// import { characterImages } from './constants/images';
// import { ImageAssets } from './engine/assets/ImageAssets';

onDOMReady(async () => {
  const audioAssets = new AssetsAudio(charactersSounds);
  const soundsAssets = await audioAssets.get();
  const sounds = new Sounds(soundsAssets);

  sounds.play('sketch', 'ahh');

  // const assets = new ImageAssets(characterImages);
  // const images = await assets.get();
});
