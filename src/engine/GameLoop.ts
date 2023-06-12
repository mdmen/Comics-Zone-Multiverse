import { Settings } from './Settings';

interface LoopOptions {
  update(deltaTime: number): void;
  fps?: number;
}

export class GameLoop {
  private readonly update;
  private readonly frameDuration;
  private previousTime;
  private rafId;

  constructor({ update, fps = Settings.getValue('fps') }: LoopOptions) {
    this.update = update;
    this.frameDuration = 1000 / fps;
    this.previousTime = 0;
    this.rafId = -1;
  }

  private loop(timeStamp: number): void {
    const delta = timeStamp - this.previousTime;

    if (delta > this.frameDuration) {
      this.previousTime = timeStamp;
      this.update(delta);
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  public start(): void {
    this.loop(performance.now());
  }

  public stop(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = -1;
  }
}
