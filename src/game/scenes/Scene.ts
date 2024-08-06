import {
  Scene as EngineScene,
  type Sounds,
  type ReturnImageAssets,
} from '@/core';
import { type Manager } from '../Manager';

type Images = ReturnImageAssets<unknown>;

export abstract class Scene {
  protected readonly manager: Manager;
  protected readonly scene;
  protected images!: Images;
  protected sounds!: Sounds;

  constructor(manager: Manager) {
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

    this.sounds?.clear();
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
