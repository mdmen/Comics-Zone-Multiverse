import { Settings } from './Settings';

enum GameLoopState {
  RUNNING,
  STOPPED,
}

interface Options {
  update(deltaStep: number): void;
  render(): void;
  fps?: number;
}

export class GameLoop {
  private readonly settings = Settings.getInstance();
  private readonly update;
  private readonly render;
  private deltaStep;
  private previousTime = 0;
  private accumulator = 0;
  private state = GameLoopState.STOPPED;

  private static MAX_HTML_FPS = 40;

  constructor({ update, render, fps = 60 }: Options) {
    this.update = update;
    this.render = render;

    const limitedFps =
      this.settings.isHTMLRenderEngine() && fps > GameLoop.MAX_HTML_FPS
        ? GameLoop.MAX_HTML_FPS
        : fps;

    this.deltaStep = 1000 / limitedFps;
  }

  private loop = (timeStamp: number) => {
    if (this.state !== GameLoopState.RUNNING) return;

    let delta = timeStamp - this.previousTime;
    if (delta > 1000) delta = this.deltaStep;

    this.accumulator += delta;
    this.previousTime = timeStamp;

    while (this.accumulator >= this.deltaStep) {
      this.update(this.deltaStep);

      this.accumulator -= this.deltaStep;
    }

    this.render();

    requestAnimationFrame(this.loop);
  };

  public start() {
    this.state = GameLoopState.RUNNING;
    requestAnimationFrame(this.loop);
  }

  public stop() {
    this.state = GameLoopState.STOPPED;
    this.previousTime = 0;
    this.accumulator = 0;
  }
}
