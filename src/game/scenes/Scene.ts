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

  public update(step: number): void {
    this.scene.update(step);
  }

  public draw(): void {
    this.scene.draw();
  }

  public leave(): void {
    this.scene.destroy();
  }

  public setImages(images: Images): void {
    this.images = images;
  }

  public setSounds(sounds: Sounds): void {
    this.sounds = sounds;
  }

  public abstract enter(): Promise<void>;
}
