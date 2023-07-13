import { Scene } from '@/engine';

export abstract class GameScene extends Scene {
  public abstract setup(): void;
  public abstract preload(): void;
}
