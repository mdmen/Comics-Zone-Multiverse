import { Scene as EngineScene, type State } from '@/engine';
import { type Manager } from '../Manager';

export abstract class Scene implements State {
  protected readonly manager: Manager;
  protected readonly scene;
  protected ready = false;

  constructor(manager: Manager) {
    this.manager = manager;
    this.scene = new EngineScene();
  }

  public async enter(): Promise<void> {
    await this.setup();
    this.ready = true;
  }

  public update(step: number): void {
    this.scene.update(step);
  }

  public draw(): void {
    this.scene.draw();
  }

  public leave(): void {
    this.ready = false;

    this.scene.destroy();
    this.scene.clear();
  }

  public isReady(): boolean {
    return this.ready;
  }

  public abstract setup(): Promise<void>;

  public abstract preload(): Promise<void>;
}
