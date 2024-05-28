import { Observable } from '../Observable';
import { ANIMATION_FRAME_DURATION } from '../config';
import { AnimationEvents } from './AnimationEvents';
import type { AnimationFrame } from './AnimationFrame';

export class Animation<T extends AnimationFrame> {
  private readonly frames;
  private readonly infinite;
  private readonly frameDurationDefault;
  private dirty = false;
  private playing = false;
  private currentFrameIndex = 0;
  private time = 0;
  private previousTime = 0;

  public readonly events = new Observable<AnimationEvents>();

  constructor(
    frames: T[],
    infinite = false,
    frameDurationDefault = ANIMATION_FRAME_DURATION
  ) {
    this.infinite = infinite;
    this.frames = frames;
    this.frameDurationDefault = frameDurationDefault;
  }

  private isLastFrame() {
    return this.currentFrameIndex === this.frames.length - 1;
  }

  private shouldUpdateFrame() {
    const delta = this.time - this.previousTime;
    const frame = this.gerCurrentFrame();
    const duration = frame.duration ?? this.frameDurationDefault;

    return delta > duration;
  }

  public gerCurrentFrame() {
    return this.frames[this.currentFrameIndex];
  }

  public play() {
    this.playing = true;
    this.time = 0;
    this.previousTime = 0;

    if (!this.dirty) {
      this.dirty = true;
      this.events.notify(AnimationEvents.Start);
    } else {
      this.events.notify(AnimationEvents.Continue);
    }
  }

  public reset() {
    this.playing = false;
    this.currentFrameIndex = 0;
    this.time = 0;
    this.previousTime = 0;
    this.dirty = false;
  }

  public stop() {
    this.playing = false;

    if (this.isLastFrame() && !this.infinite) {
      this.dirty = false;
      this.events.notify(AnimationEvents.END);
    } else {
      this.events.notify(AnimationEvents.STOP);
    }
  }

  public update(deltaStep: number) {
    if (!this.playing) return;

    this.time += deltaStep;

    if (!this.shouldUpdateFrame()) return;

    this.previousTime = this.time;

    if (this.isLastFrame()) {
      if (this.infinite) {
        this.currentFrameIndex = 0;
        return;
      }

      this.stop();
      return;
    }

    this.currentFrameIndex++;
  }
}
