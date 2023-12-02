import {
  Scene as EngineScene,
  type Sounds,
  type SpriteImageData,
  type State,
  type SpriteAsset,
} from '@/engine';
import { type Manager } from '../Manager';

type Images = Record<string, HTMLImageElement | SpriteAsset<SpriteImageData>>;

export abstract class Scene implements State {
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
    this.scene.destroy();
  }

  setImages(images: Images) {
    this.images = images;
  }

  setSounds(sounds: Sounds) {
    this.sounds = sounds;
  }

  abstract enter(): Promise<void>;
}
