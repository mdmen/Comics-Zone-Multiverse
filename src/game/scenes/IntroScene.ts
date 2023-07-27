import {
  Factory,
  type ReturnAudioAssets,
  type ReturnImageAssets,
  type Sounds,
} from '@/engine';
import { Scene } from './Scene';
import { type introSceneImages, type introSceneSounds } from '@/constants';

export class IntroScene extends Scene {
  protected images!: ReturnImageAssets<typeof introSceneImages>;
  protected sounds!: Sounds<ReturnAudioAssets<typeof introSceneSounds>>;

  public async enter(): Promise<void> {
    const layers = this.manager.getLayers();
    const earlier = await Factory.createImage({
      layer: layers.bottom,
      image: this.images.earlier,
      scale: 3.2,
    });

    this.scene.add(earlier);
  }
}
