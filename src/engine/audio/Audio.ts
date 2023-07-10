export class Audio {
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;

  constructor() {
    this.context = new AudioContext();
    this.gainNode = new GainNode(this.context);

    this.bindResumeContext();
  }

  private bindResumeContext(): void {
    const resume = () => {
      this.resumeContext();
    };

    window.addEventListener('keydown', resume, { once: true });
    window.addEventListener('mousedown', resume, { once: true });
  }

  private resumeContext(): void {
    if (this.context.state === 'suspended') {
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
