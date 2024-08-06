import { Picture, Sounds, type Layer } from '@/core';
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
import { BlinkModifier } from '../modifiers';
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

    const centerProgressPicture = (image: Picture, layer: Layer) => {
      const x = layer.getWidth() / 2 - image.getWidth() / 2;
      image.setPosition(x, image.getPosition().y);
    };

    const upperProgressPicture = new Picture({
      y: 200,
      scale: 3,
      layer: layers.top,
      image: loadingImages.loadingFinish,
      onCreate(image) {
        centerProgressPicture(image, layers.top);
      },
    });

    const lowerProgressPicture = new Picture({
      y: 200,
      scale: 3,
      layer: layers.top,
      image: loadingImages.loadingStart,
      onCreate(image) {
        centerProgressPicture(image, layers.top);
      },
    });

    const progressImage = new ProgressImage({
      total: resourcesAmount,
      lowerPicture: lowerProgressPicture,
      upperPicture: upperProgressPicture,
      delay: 10,
    });

    const progressLoadingText = new BaseText({
      layer: layers.top,
      image: imageFonts.base.image,
      data: imageFonts.base.data,
      text: 'Loading...',
      scale: 3,
      y: 550,
    });

    const progressText = new ProgressText({
      total: resourcesAmount,
      text: progressLoadingText,
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
      observe: (progress) => {
        const progressPercent = progress.getProgressPercent();

        if (progressPercent !== 100) return;

        const pressAnyKeyText = new BaseText({
          layer: layers.top,
          image: imageFonts.base.image,
          data: imageFonts.base.data,
          text: 'Press any key to continue',
          scale: 3,
          y: 550,
          onCreate(text) {
            progressLoadingText.hide();
            centerProgressPicture(text, layers.top);
          },
        });

        pressAnyKeyText.addModifier(new BlinkModifier(4));

        this.scene.add(pressAnyKeyText);

        onPressOnce(() => {
          this.manager.setScene(Scenes.INTRO);
        });
      },
    });

    this.scene.add(upperProgressPicture);
    this.scene.add(lowerProgressPicture);
    this.scene.add(progressLoadingText);

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
