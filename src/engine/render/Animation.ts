export interface AnimationFrame {
  name: string;
  duration?: number;
}

export interface AnimationOptions {
  frames: AnimationFrame[];
  infinite?: boolean;
  frameDuration?: number;
  onStart?(): void;
  onFinish?(): void;
}

export class Animation {
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
    frames,
    infinite = false,
    frameDuration = 200,
    onStart = () => {},
    onFinish = () => {},
  }: AnimationOptions) {
    this.frameDuration = frameDuration;
    this.infinite = infinite;
    this.frames = frames;
    this.onStart = onStart;
    this.onFinish = onFinish;
  }

  private shouldFinish() {
    return this.frameIndex === this.frames.length - 1;
  }

  private shouldUpdateFrame(timeStamp: number) {
    const delta = timeStamp - this.previousTime;
    const frame = this.gerCurrentFrame();
    const duration = frame.duration || this.frameDuration;

    return delta > duration;
  }

  gerCurrentFrame() {
    return this.frames[this.frameIndex];
  }

  play() {
    this.playing = true;
  }

  pause() {
    this.playing = false;
  }

  reset() {
    this.playing = false;
    this.frameIndex = 0;
    this.dirty = false;
  }

  stop() {
    this.reset();
    this.onFinish();
  }

  update() {
    if (!this.playing) return;

    const now = performance.now();

    if (!this.dirty) {
      this.onStart();
      this.dirty = true;
    }

    if (!this.shouldUpdateFrame(now)) return;

    this.previousTime = now;

    if (!this.shouldFinish()) {
      this.frameIndex++;
      return;
    }

    if (this.infinite) {
      this.frameIndex = 0;
      return;
    }

    this.stop();
  }
}
