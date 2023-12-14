import {
  Scene as EngineScene,
  type Sounds,
  type State,
  type ReturnImageAssets,
} from '@/engine';
import { type SceneManager } from './SceneManager';

type Images = ReturnImageAssets<unknown>;

export abstract class Scene implements State {
  protected readonly manager: SceneManager;
  protected readonly scene;
  protected images!: Images;
  protected sounds!: Sounds;

  constructor(manager: SceneManager) {
    this.manager = manager;
    this.scene = new EngineScene();
  }

  update(step: number) {
    this.scene.update(step);
  }

  draw() {
    this.scene.draw();
  }

  leave() {
    this.destroy();
  }

  destroy() {
    this.scene.destroy();
    this.images = null as unknown as Images;
    this.sounds = null as unknown as Sounds;
  }

  setImages(images: Images) {
    this.images = images;
  }

  setSounds(sounds: Sounds) {
    this.sounds = sounds;
  }

  abstract enter(): Promise<void>;
}
