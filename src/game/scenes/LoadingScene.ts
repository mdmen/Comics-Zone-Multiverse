import { SpriteText, Vector } from '@/engine';
import { Scene } from './Scene';
import {
  globalImages,
  globalSounds,
  introSceneImages,
  loadingSceneImages,
  fonts,
} from '@/constants';
import { ProgressImage, ProgressText } from '@/game/components';

export class LoadingScene extends Scene {
  public async setup(): Promise<void> {
    const layers = this.manager.getLayers();
    const fontAssets = this.manager.getFontAssets();
    const imageAssets = this.manager.getImageAssets();
    const audioAssets = this.manager.getAudioAssets();

    const [spriteFonts, loadingImages] = await Promise.all([
      await fontAssets.load(fonts),
      await imageAssets.load(loadingSceneImages),
    ]);

    SpriteText.setup({
      layer: layers.top,
      font: spriteFonts.basic,
      transform: (str) => str.toUpperCase(),
    });

    const progressImage = new ProgressImage({
      position: new Vector(0, 200),
      total: this.countTotal(),
      scene: this.scene,
      centered: true,
      layer: layers.top,
      scale: 3,
      lowerImage: loadingImages.loadingFinish,
      upperImage: loadingImages.loadingStart,
    });

    const progressText = new ProgressText({
      position: new Vector(0, 550),
      total: this.countTotal(),
      scene: this.scene,
      scale: 2.3,
      centered: true,
    });

    imageAssets.subscribe(progressImage);
    imageAssets.subscribe(progressText);
    audioAssets.subscribe(progressImage);
    audioAssets.subscribe(progressText);

    const [gameGlobalImages, gameGlobalSounds] = await Promise.all([
      await imageAssets.load(globalImages),
      await audioAssets.load(globalSounds),
    ]);

    this.manager.setImages(gameGlobalImages);
    this.manager.setSounds(gameGlobalSounds);
  }

  private countTotal(): number {
    return [globalImages, globalSounds].reduce(
      (sum, manifest) => sum + Object.keys(manifest).length,
      0
    );
  }

  public async preload(): Promise<void> {}
}
