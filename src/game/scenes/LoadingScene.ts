import { Sounds } from '@/engine';
import { Scene } from './Scene';
import {
  globalImages,
  introSceneImages,
  loadingSceneImages,
} from '@/assets/images';
import { BaseText } from '../BaseText';
import { globalSounds } from '@/assets/sounds';
import { globalFonts } from '@/assets/fonts';
import { ProgressImage, ProgressText } from '../components';
import { OpacityModifier } from '../modifiers';
import { Scenes } from './scenes';
import { countObjectKeys, onPressOnce } from '../helpers';

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

    const resourcesAmount = countObjectKeys([
      globalImages,
      globalSounds,
      introSceneImages,
    ]);

    const progressImage = new ProgressImage({
      y: 200,
      total: resourcesAmount,
      scene: this.scene,
      layer: layers.top,
      scale: 3,
      image: loadingImages.loadingFinish,
      upperImage: loadingImages.loadingStart,
      delay: 10,
      onCreate(image) {
        image.centerHorizontally();
      },
    });

    const progressText = new ProgressText({
      layer: layers.top,
      image: imageFonts.base.image,
      data: imageFonts.base.data,
      x: 380,
      y: 550,
      total: resourcesAmount,
      scene: this.scene,
      scale: 3,
      delay: 10,
      template(progress) {
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

        const pressAnyKeyText = new BaseText({
          layer: layers.top,
          image: imageFonts.base.image,
          data: imageFonts.base.data,
          text: 'Press any key to continue',
          scale: 3,
          y: 550,
          onCreate(text) {
            progressText.hide();
            text.centerHorizontally();
          },
        });

        pressAnyKeyText.addModifier(new OpacityModifier(4));

        this.scene.add(pressAnyKeyText);

        onPressOnce(() => {
          this.manager.setScene(Scenes.INTRO);
        });
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
