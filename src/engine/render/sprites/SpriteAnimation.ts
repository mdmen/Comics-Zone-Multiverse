import type { SpriteFrame } from './SpriteBase';

interface AnimationOptions {
  frames: Record<string, SpriteFrame>;
  names: string[];
  infinite?: boolean;
  frameDuration?: number;
  onStart?(): void;
  onFinish?(): void;
}

export class SpriteAnimation {
  private readonly frames;
  private readonly names;
  private readonly frameDuration;
  private readonly infinite;
  private readonly onStart;
  private readonly onFinish;
  private finished;
  private dirty;
  private frameIndex;
  private playing;

  constructor({
    frames,
    names,
    infinite = false,
    frameDuration = 200,
    onStart = () => {},
    onFinish = () => {},
  }: AnimationOptions) {
    this.frames = frames;
    this.names = names;
    this.playing = false;
    this.frameIndex = 0;
    this.frameDuration = frameDuration;
    this.infinite = infinite;
    this.dirty = false;
    this.finished = false;
    this.onStart = onStart;
    this.onFinish = onFinish;
  }

  private handleStarted(): void {
    if (this.frameIndex > 0 || !this.dirty) return;

    this.dirty = true;
    this.onStart();
  }

  private handleFinish(): void {
    if (this.frameIndex < this.names.length) return;

    if (this.infinite) {
      this.frameIndex = 0;
      return;
    }

    this.finish();
  }

  private shouldUpdateFrame(deltaTime: number): boolean {
    if (this.finished) return false;

    const frame = this.getCurrentFrame();
    const duration = frame.duration || this.frameDuration;

    return deltaTime > duration;
  }

  public reset(): void {
    this.playing = false;
    this.finished = false;
    this.frameIndex = 0;
    this.dirty = false;
  }

  public update(deltaTime: number): void {
    if (!this.playing) return;

    this.handleStarted();
    this.handleFinish();

    if (this.shouldUpdateFrame(deltaTime)) {
      this.frameIndex++;
    }
  }

  public play(): void {
    this.playing = true;
  }

  public pause(): void {
    this.playing = false;
  }

  public finish(): void {
    this.playing = false;
    this.finished = true;

    this.onFinish();
  }

  public getCurrentFrame(): SpriteFrame {
    const name = this.names[this.frameIndex];
    return this.frames[name];
  }
}
