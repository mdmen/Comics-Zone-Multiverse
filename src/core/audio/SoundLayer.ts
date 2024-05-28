export class SoundLayer {
  private readonly context;
  private readonly gainNode;

  constructor(context: AudioContext) {
    this.gainNode = new GainNode(context);
    this.gainNode.connect(context.destination);
    this.context = context;
  }

  public setVolume(value: number) {
    this.gainNode.gain.setValueAtTime(value, this.context.currentTime);
  }

  public setMuted(value: boolean, duration = 0.5) {
    this.gainNode.gain.linearRampToValueAtTime(
      +value,
      this.context.currentTime + duration
    );
  }

  public getContext() {
    return this.context;
  }

  public getGainNode() {
    return this.gainNode;
  }
}
