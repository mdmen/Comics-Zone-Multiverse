import { Settings } from './Settings';

interface LoopOptions {
  update(deltaStep: number): void;
  draw(): void;
  fps?: number;
}

export class GameLoop {
  private readonly update;
  private readonly draw;
  private readonly frameDuration;
  private readonly step;
  private readonly maxDeltaTime = 100;
  private previousTime = 0;
  private previousDrawTime = 0;
  private rafId = -1;
  private accumulator = 0;

  constructor({ update, draw, fps = Settings.get('fps') }: LoopOptions) {
    this.update = update;
    this.draw = draw;
    this.frameDuration = 1000 / fps;
    this.step = 1 / fps;

    this.loop = this.loop.bind(this);
  }

  // with time based animation technique
  private loop(timeStamp: number): void {
    this.accumulator += timeStamp - this.previousTime;
    this.previousTime = timeStamp;

    if (this.accumulator > this.maxDeltaTime) {
      this.accumulator = this.frameDuration;
    }

    while (this.accumulator >= this.frameDuration) {
      this.update(this.step);
      this.accumulator -= this.frameDuration;
    }

    if (timeStamp - this.previousDrawTime >= (this.frameDuration | 0)) {
      this.draw();
      this.previousDrawTime = timeStamp;
    }

    this.rafId = requestAnimationFrame(this.loop);
  }

  public start(): void {
    this.loop(0);
  }

  public stop(): void {
    cancelAnimationFrame(this.rafId);
    this.previousTime = 0;
    this.accumulator = 0;
  }
}
