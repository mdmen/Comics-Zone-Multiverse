import { PictureOptions, Scene, Settings } from '@/engine';
import { GlitchImageCanvas } from './GlitchImageCanvas';
import { GlitchImageDOM } from './GlitchImageDOM';

interface Options extends PictureOptions {
  scene: Scene;
  delayMin?: number;
  delayMax?: number;
  classList?: string[];
}

export class GlitchImage {
  private readonly scene;
  private readonly glitchImage;

  constructor({ scene, ...options }: Options) {
    this.scene = scene;
    this.glitchImage = Settings.isDOMEngine()
      ? new GlitchImageDOM(options)
      : new GlitchImageCanvas(options);

    this.scene.add(this.glitchImage);
  }

  start() {
    this.glitchImage.start();
  }

  stop() {
    this.glitchImage.stop();
  }

  hide() {
    this.glitchImage.hide();
  }
}
