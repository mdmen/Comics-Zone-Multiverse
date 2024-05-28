export class SoundContext {
  private static instance: SoundContext;
  private readonly context = new AudioContext();

  private constructor() {
    this.bindResume();
  }

  public static getInstance() {
    if (!SoundContext.instance) {
      SoundContext.instance = new SoundContext();
    }

    return SoundContext.instance;
  }

  private bindResume() {
    const resume = () => {
      this.resume();

      document.removeEventListener('keydown', resume);
      document.removeEventListener('pointerdown', resume);
    };

    document.addEventListener('keydown', resume);
    document.addEventListener('pointerdown', resume);
  }

  public pause() {
    if (this.context.state === 'running') {
      this.context.suspend();
    }
  }

  public resume() {
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  public getContext() {
    return this.context;
  }
}
