export class Audio {
  private static instance: Audio;
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
    const volume = value ? 0 : 1;
    this.gainNode.gain.setValueAtTime(volume, this.context.currentTime);
  }

  public getContext(): AudioContext {
    return this.context;
  }

  public static getInstance(): Audio {
    if (!Audio.instance) {
      Audio.instance = new Audio();
    }

    return Audio.instance;
  }
}
