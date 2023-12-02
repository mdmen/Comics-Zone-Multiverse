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
import { Scenes } from '../Manager';

export class LoadingScene extends Scene {
  async enter(): Promise<void> {
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

    const resourcesAmount = [
      globalImages,
      globalSounds,
      introSceneImages,
    ].reduce((sum, manifest) => sum + Object.keys(manifest).length, 0);

    const progressImage = new ProgressImage({
      position: new Vector(0, 200),
      total: resourcesAmount,
      scene: this.scene,
      centered: true,
      layer: layers.top,
      scale: 3,
      lowerImage: loadingImages.loadingFinish,
      upperImage: loadingImages.loadingStart,
      stepDelay: 0, // 10,
    });

    const progressText = new ProgressText({
      position: new Vector(380, 550),
      total: resourcesAmount,
      scene: this.scene,
      scale: 3,
      stepDelay: 0, // 5,
      templateFunc(progress) {
        return `Loading...${progress}%`;
      },
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

        const opacity = new OpacityModifier({
          velocity: 2,
        });
        pressAnyKeyText.addModifier(opacity);

        this.scene.add(pressAnyKeyText);

        window.addEventListener(
          'keydown',
          () => {
            this.manager.setState(Scenes.INTRO);
          },
          { once: true }
        );
      },
    });

    const [gameGlobalImages, gameGlobalSounds, introImages] = await Promise.all(
      [
        await imageAssets.load(globalImages),
        await audioAssets.load(globalSounds),
        await imageAssets.load(introSceneImages),
      ]
    );

    this.manager.setGlobalImages(gameGlobalImages);
    this.manager.setGlobalSounds(gameGlobalSounds);

    const introScene = this.manager.getState(Scenes.INTRO);
    introScene.setImages(introImages);
  }
}
