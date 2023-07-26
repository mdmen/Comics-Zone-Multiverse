import { SpriteText, Vector } from '@/engine';
import { Scene } from './Scene';
import {
  globalImages,
  globalSounds,
  introSceneImages,
  loadingSceneImages,
  fonts,
} from '@/constants';
import { ProgressImage, ProgressText } from '../components';
import { OpacityModifier } from '../modifiers';

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

    const resourcesAmount = [globalImages, globalSounds].reduce(
      (sum, manifest) => sum + Object.keys(manifest).length,
      0
    );

    const progressImage = new ProgressImage({
      position: new Vector(0, 200),
      total: resourcesAmount,
      scene: this.scene,
      centered: true,
      layer: layers.top,
      scale: 3,
      lowerImage: loadingImages.loadingFinish,
      upperImage: loadingImages.loadingStart,
      stepDelay: 10,
    });

    const progressText = new ProgressText({
      position: new Vector(380, 550),
      total: resourcesAmount,
      scene: this.scene,
      scale: 3,
      stepDelay: 5,
    });

    imageAssets.subscribe(progressImage);
    imageAssets.subscribe(progressText);
    audioAssets.subscribe(progressImage);
    audioAssets.subscribe(progressText);

    progressText.subscribe({
      update: (progress: number) => {
        if (progress !== 100) return;

        const pressAnyKeyText = new SpriteText({
          text: 'Press any key to continue',
          scale: 3,
          y: 550,
          onCreate(text) {
            progressText.hide();
            text.centerHorizontally();
          },
        });

        const opacityModifier = new OpacityModifier({
          velocity: 2,
        });
        pressAnyKeyText.addModifier(opacityModifier);

        this.scene.add(pressAnyKeyText);
      },
    });

    const [gameGlobalImages, gameGlobalSounds] = await Promise.all([
      await imageAssets.load(globalImages),
      await audioAssets.load(globalSounds),
    ]);

    this.manager.setImages(gameGlobalImages);
    this.manager.setSounds(gameGlobalSounds);
  }

  public async preload(): Promise<void> {}
}
