import { Settings } from '../../Settings';
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
  private dirty;
  private frameIndex;
  private playing;

  constructor({
    frames,
    names,
    infinite = false,
    frameDuration = Settings.getValue('spriteFrameDurationDefault'),
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
    this.onStart = onStart;
    this.onFinish = onFinish;
  }

  private isStarted(): boolean {
    return this.frameIndex === 0 && this.dirty === false;
  }

  private shouldFinish(): boolean {
    return this.frameIndex >= this.names.length;
  }

  private shouldUpdateFrame(timeStamp: number): boolean {
    const frame = this.getCurrentFrame();
    const duration = frame.duration || this.frameDuration;

    return performance.now() - timeStamp > duration;
  }

  public update(timeStamp: number): void {
    if (!this.playing) return;

    if (this.isStarted()) {
      this.dirty = true;
      this.onStart();
    }

    if (this.shouldFinish()) {
      if (this.infinite) {
        this.frameIndex = 0;
        return;
      }

      this.finish();
      return;
    }

    if (this.shouldUpdateFrame(timeStamp)) {
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
    this.reset();
    this.onFinish();
  }

  public reset(): void {
    this.playing = false;
    this.frameIndex = 0;
    this.dirty = false;
  }

  public getCurrentFrame(): SpriteFrame {
    const name = this.names[this.frameIndex];
    return this.frames[name];
  }
}
