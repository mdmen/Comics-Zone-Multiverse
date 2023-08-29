import { type FrameSource, type Frame } from './Sprite';

interface AnimationOptions {
  frameSources: Record<string, FrameSource>;
  frames: Frame[];
  infinite?: boolean;
  frameDuration?: number;
  onStart?(): void;
  onFinish?(): void;
}

export class SpriteAnimation {
  private readonly frameSources;
  private readonly frames;
  private readonly frameDuration;
  private readonly infinite;
  private readonly onStart;
  private readonly onFinish;
  private dirty = false;
  private frameIndex = 0;
  private playing = false;
  private previousTime = 0;

  constructor({
    frameSources,
    frames,
    infinite = false,
    frameDuration = 200,
    onStart = () => {},
    onFinish = () => {},
  }: AnimationOptions) {
    this.frameSources = frameSources;
    this.frameDuration = frameDuration;
    this.infinite = infinite;
    this.frames = frames;
    this.onStart = onStart;
    this.onFinish = onFinish;
  }

  private handleStarted(): void {
    if (this.frameIndex > 0 || !this.dirty) return;

    this.dirty = true;
    this.onStart();
  }

  private handleFinish(): void {
    if (this.infinite) {
      this.frameIndex = 0;
      return;
    }

    this.reset();
    this.onFinish();
  }

  private shouldFinish(): boolean {
    return this.frameIndex === this.frames.length - 1;
  }

  private gerCurrentFrame(): Frame {
    return this.frames[this.frameIndex];
  }

  private shouldUpdateFrame(timeStamp: number): boolean {
    const delta = timeStamp - this.previousTime;
    const frame = this.gerCurrentFrame();
    const duration = frame.duration || this.frameDuration;

    return delta > duration;
  }

  public reset(): void {
    this.playing = false;
    this.frameIndex = 0;
    this.dirty = false;
  }

  public update(): void {
    if (!this.playing) return;

    const now = performance.now();
    this.handleStarted();

    if (this.shouldUpdateFrame(now)) {
      this.previousTime = now;

      if (this.shouldFinish()) {
        this.handleFinish();
        return;
      }

      this.frameIndex++;
    }
  }

  public play(): void {
    this.playing = true;
  }

  public pause(): void {
    this.playing = false;
  }

  public getCurrentFrameSource(): FrameSource {
    const frameName = this.gerCurrentFrame();
    return this.frameSources[frameName.name];
  }
}
