export class Audio {
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;

  constructor() {
    this.context = new AudioContext();
    this.gainNode = new GainNode(this.context);

    this.bindResumeContext();
  }

  private bindResumeContext() {
    const resume = () => {
      this.resumeContext();
    };

    window.addEventListener('keydown', resume, { once: true });
    window.addEventListener('mousedown', resume, { once: true });
  }

  private resumeContext() {
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  setMuted(value: boolean) {
    this.gainNode.gain.value = +value;
  }

  getContext() {
    return this.context;
  }
}
