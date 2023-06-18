import { Settings } from './Settings';

interface LoopOptions {
  update(timeStamp: number): void;
  fps?: number;
}

export class GameLoop {
  private readonly update;
  private readonly frameDuration;
  private previousTime = 0;
  private rafId = -1;

  constructor({ update, fps = Settings.getValue('fps') }: LoopOptions) {
    this.update = update;
    this.frameDuration = 1000 / fps;

    this.loop = this.loop.bind(this);
  }

  private loop(timeStamp: number): void {
    const delta = timeStamp - this.previousTime;

    if (delta > this.frameDuration) {
      this.update(timeStamp);
      this.previousTime = timeStamp;
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  public start(): void {
    this.loop(0);
  }

  public stop(): void {
    cancelAnimationFrame(this.rafId);
    this.rafId = -1;
  }
}
