export class Audio {
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;

  constructor() {
    this.context = new AudioContext();
    this.gainNode = new GainNode(this.context);
  }

  private isSuspended(): boolean {
    return this.context.state === 'suspended';
  }

  public resumeContext(): void {
    if (this.isSuspended()) {
      this.context.resume();
    }
  }

  public setMuted(value: boolean): void {
    this.gainNode.gain.value = +value;
  }

  public getContext(): AudioContext {
    return this.context;
  }
}
