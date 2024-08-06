import {
  delay,
  type ReturnAudioAssets,
  type ReturnImageAssets,
  type Sounds,
} from '@/core';
import { Scene } from './Scene';
import { introSceneImages } from '@/assets/images';
import { introSceneSounds } from '@/assets/sounds';
import { createGlitchImage } from '../components';

export class IntroScene extends Scene {
  protected images!: ReturnImageAssets<typeof introSceneImages>;
  protected sounds!: Sounds<ReturnAudioAssets<typeof introSceneSounds>>;

  async enter() {
    const layers = this.manager.getLayers();

    const earlierGlitch = createGlitchImage({
      layer: layers.bottom,
      image: this.images.earlier,
      scale: 3.2,
      classList: ['earlier'],
    });

    await delay(3000);

    this.scene.add(earlierGlitch);
    earlierGlitch.start();

    await delay(3000);

    earlierGlitch.stop();
    earlierGlitch.hide();

    // new Hud({
    //   x: 300,
    //   layer: layers.middle,
    //   scene: this.scene,
    //   scale: 3,
    //   manager: this.manager,
    // });
  }
}
