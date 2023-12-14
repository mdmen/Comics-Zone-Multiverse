import { Text, Vector, Sounds } from '@/engine';
import { Scene } from './Scene';
import {
  globalImages,
  introSceneImages,
  loadingSceneImages,
} from '@/assets/images';
import { globalSounds } from '@/assets/sounds';
import { globalFonts } from '@/assets/fonts';
import { ProgressImage, ProgressText } from '../components';
import { OpacityModifier } from '../modifiers';
import { Scenes } from './scenes';

export class LoadingScene extends Scene {
  async enter() {
    const layers = this.manager.getLayers();
    const fontAssets = this.manager.getFontAssets();
    const imageAssets = this.manager.getImageAssets();
    const audioAssets = this.manager.getAudioAssets();

    const [imageFonts, loadingImages] = await Promise.all([
      await fontAssets.load(globalFonts),
      await imageAssets.load(loadingSceneImages),
    ]);

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

        const pressAnyKeyText = new Text({
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
            this.manager.setScene(Scenes.INTRO);
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

    this.manager.setGlobalFonts(imageFonts);
    this.manager.setGlobalImages(gameGlobalImages);

    const audio = this.manager.getAudio();
    const sounds = new Sounds(gameGlobalSounds, audio);
    this.manager.setGlobalSounds(sounds);

    const introScene = this.manager.getScene(Scenes.INTRO);
    introScene.setImages(introImages);
  }
}
