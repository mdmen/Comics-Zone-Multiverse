import { Settings } from './Settings';

interface Options {
  update(deltaStep: number): void;
  render(): void;
  fps?: number;
}

export class GameLoop {
  private readonly update;
  private readonly render;
  private readonly deltaStep;
  private previousTime = 0;
  private rafId = -1;
  private accumulator = 0;

  constructor({ update, render, fps = Settings.get('fps') }: Options) {
    this.update = update;
    this.render = render;
    this.deltaStep = 1000 / fps;

    this.loop = this.loop.bind(this);
  }

  private loop(timeStamp: number) {
    if (timeStamp < this.previousTime + this.deltaStep) {
      this.start();
      return;
    }

    this.accumulator += timeStamp - this.previousTime;
    this.previousTime = timeStamp;

    while (this.accumulator >= this.deltaStep) {
      this.update(this.deltaStep);

      this.accumulator -= this.deltaStep;
    }

    this.render();

    this.start();
  }

  start() {
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    this.previousTime = 0;
    this.accumulator = 0;
  }
}
