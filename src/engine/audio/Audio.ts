export class Audio {
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;

  private constructor() {
    this.context = new AudioContext();
    this.gainNode = new GainNode(this.context);

    if (this.isSuspended()) {
      this.context.resume();
    }
  }

  private isSuspended(): boolean {
    return this.context.state === 'suspended';
  }

  public setMuted(value: boolean): void {
    this.gainNode.gain.value = +value;
  }

  public getContext(): AudioContext {
    return this.context;
  }
}
