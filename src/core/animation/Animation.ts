import { Observable } from '../Observable';
import { AnimationEvents } from './AnimationEvents';
import type { AnimationFrame } from './AnimationFrame';

interface Options {
  frames: AnimationFrame[];
  infinite?: boolean;
  frameDuration?: number;
}

export class Animation {
  private readonly frames;
  private readonly infinite;
  private readonly frameDuration;
  private dirty = false;
  private playing = false;
  private currentFrameIndex = 0;
  private previousTime = 0;

  public readonly events = new Observable<AnimationEvents>();

  constructor({ frames, infinite = false, frameDuration = 100 }: Options) {
    this.infinite = infinite;
    this.frames = frames;
    this.frameDuration = frameDuration;
  }

  private shouldFinish() {
    return this.currentFrameIndex === this.frames.length - 1;
  }

  private shouldUpdateFrame(timeStamp: number) {
    const delta = timeStamp - this.previousTime;
    const frame = this.gerCurrentFrame();
    const duration = frame.duration ?? this.frameDuration;

    return delta > duration;
  }

  public gerCurrentFrame() {
    return this.frames[this.currentFrameIndex];
  }

  public play() {
    this.playing = true;
    this.previousTime = performance.now();

    if (!this.dirty) {
      this.dirty = true;
      this.events.notify(AnimationEvents.START);
    } else {
      this.events.notify(AnimationEvents.CONTINUE);
    }
  }

  public reset() {
    this.playing = false;
    this.currentFrameIndex = 0;
    this.dirty = false;
  }

  public stop() {
    this.playing = false;

    if (this.shouldFinish()) {
      this.dirty = false;
      this.events.notify(AnimationEvents.END);
    } else {
      this.events.notify(AnimationEvents.STOP);
    }
  }

  public update() {
    if (!this.playing) return;

    const now = performance.now();

    if (!this.shouldUpdateFrame(now)) return;

    this.previousTime = now;

    if (this.shouldFinish()) {
      if (this.infinite) {
        this.currentFrameIndex = 0;
        return;
      }

      return this.stop();
    }

    this.currentFrameIndex++;
  }
}
