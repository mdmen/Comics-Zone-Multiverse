import {
  delay,
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

  public async enter(): Promise<void> {
    const layers = this.manager.getLayers();

    const earlierGlitch = new GlitchImage({
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

    const hud = new Hud({
      layer: layers.middle,
      scene: this.scene,
      scale: 3,
    });
  }
}
