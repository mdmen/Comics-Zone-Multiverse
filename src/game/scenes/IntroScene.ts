import {
  type ReturnAudioAssets,
  type ReturnImageAssets,
  type Sounds,
} from '@/engine';
import { Scene } from './Scene';
import { type introSceneImages, type introSceneSounds } from '@/constants';
import { GlitchImage } from '../components';

export class IntroScene extends Scene {
  protected images!: ReturnImageAssets<typeof introSceneImages>;
  protected sounds!: Sounds<ReturnAudioAssets<typeof introSceneSounds>>;

  public async enter(): Promise<void> {
    const layers = this.manager.getLayers();

    const earlier = new GlitchImage({
      scene: this.scene,
      layer: layers.bottom,
      image: this.images.earlier,
      scale: 2.6,
      classList: ['earlier'],
    });

    earlier.start();
  }
}
