import { Settings } from '../../Settings';
import type { SpriteFrame } from './Sprite';

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
  private dirty = false;
  private frameIndex = 0;
  private playing = false;
  private previousTime = 0;

  constructor({
    frames,
    names,
    infinite = false,
    frameDuration = Settings.get('animationFrameDuration'),
    onStart = () => {},
    onFinish = () => {},
  }: AnimationOptions) {
    this.frames = frames;
    this.names = names;
    this.frameDuration = frameDuration;
    this.infinite = infinite;
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
    return this.frameIndex === this.names.length - 1;
  }

  private shouldUpdateFrame(timeStamp: number): boolean {
    const delta = timeStamp - this.previousTime;
    const frame = this.getCurrentFrame();
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

  public getCurrentFrame(): SpriteFrame {
    const name = this.names[this.frameIndex];
    return this.frames[name];
  }
}
