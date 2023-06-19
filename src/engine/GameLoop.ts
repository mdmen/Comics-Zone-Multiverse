import { Settings } from './Settings';

interface LoopOptions {
  update(deltaStep: number): void;
  draw(): void;
  fps?: number;
}

export class GameLoop {
  private readonly update;
  private readonly draw;
  private readonly deltaTime;
  private readonly deltaStep;
  private previousTime = 0;
  private rafId = -1;
  private accumulator = 0;

  constructor({ update, draw, fps = Settings.getValue('fps') }: LoopOptions) {
    this.update = update;
    this.draw = draw;
    this.deltaTime = 1000 / fps;
    this.deltaStep = 1 / fps;

    this.loop = this.loop.bind(this);
  }

  // with time based animation technique
  private loop(timeStamp: number): void {
    let delta = timeStamp - this.previousTime;

    // minimum ~ 30 fps
    if (delta > 33) delta = 33;

    this.previousTime = timeStamp;
    this.accumulator += delta;

    while (this.accumulator >= this.deltaTime) {
      this.update(this.deltaStep);
      this.accumulator -= this.deltaTime;
    }

    this.draw();
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
