import { Observable } from '../Observable';
import type { AnimationFrame } from './AnimationFrame';

export class Animation<Frame extends AnimationFrame> {
  private readonly frames;
  private readonly infinite;
  private readonly frameDuration;
  private dirty = false;
  private playing = false;
  private currentFrameIndex = 0;
  private time = 0;
  private previousTime = 0;

  public readonly startEvent = new Observable<this>();
  public readonly endEvent = new Observable<this>();

  constructor(frames: Frame[], infinite = false, frameDuration = 100) {
    this.infinite = infinite;
    this.frames = frames;
    this.frameDuration = frameDuration;
  }

  private isLastFrame() {
    return this.currentFrameIndex === this.frames.length - 1;
  }

  private shouldUpdateFrame() {
    const delta = this.time - this.previousTime;
    const frame = this.getCurrentFrame();
    const duration = frame.duration || this.frameDuration;

    return delta > duration;
  }

  public getCurrentFrame() {
    return this.frames[this.currentFrameIndex];
  }

  public play() {
    this.playing = true;
    this.time = 0;
    this.previousTime = 0;

    if (!this.dirty) {
      this.dirty = true;
      this.startEvent.notify(this);
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
      this.endEvent.notify(this);
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
