import {
  type ReturnAudioAssets,
  type ReturnImageAssets,
  type Sounds,
} from '@/engine';
import { Scene } from './Scene';
import { type introSceneImages, type introSceneSounds } from '@/constants';
import { GlitchImage, Hud } from '../components';

export class IntroScene extends Scene {
  protected images!: ReturnImageAssets<typeof introSceneImages>;
  protected sounds!: Sounds<ReturnAudioAssets<typeof introSceneSounds>>;

  async enter(): Promise<void> {
    const layers = this.manager.getLayers();

    new GlitchImage({
      scene: this.scene,
      layer: layers.bottom,
      image: this.images.earlier,
      scale: 3.2,
      classList: ['earlier'],
    });

    // await delay(3000);

    // earlierGlitch.start();

    // await delay(3000);

    // earlierGlitch.stop();
    // earlierGlitch.hide();

    new Hud({
      x: 300,
      layer: layers.middle,
      scene: this.scene,
      scale: 3,
      manager: this.manager,
    });
  }
}
