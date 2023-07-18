import { SpriteText, Progress } from '@/engine';
import { Scene } from '../Scene';
import {
  globalImages,
  globalSounds,
  introSceneImages,
  loadingSceneImages,
  fonts,
} from '@/constants';

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

    const total = Object.keys({
      ...globalImages,
      ...globalSounds,
      ...introSceneImages,
    }).length;
    const progress = new Progress(total);

    const loadingText = new SpriteText({
      text: "Common guys! Let's do it together. Ahh that gross but fun !!! But why...",
      scale: 2,
      maxWidth: 200,
    });

    this.scene.add(loadingText);
  }

  public async preload(): Promise<void> {}
}
