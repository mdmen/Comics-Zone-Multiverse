interface PlayOptions {
  buffer: AudioBuffer;
  loop?: boolean;
  start?: number;
  end?: number;
}

export class Audio {
  private static instance: Audio;
  private readonly context: AudioContext;
  private readonly gainNode: GainNode;
  private readonly playing: Map<AudioBuffer, AudioBufferSourceNode>;

  constructor() {
    this.context = new AudioContext();
    this.playing = new Map();
    this.gainNode = this.context.createGain();

    if (this.isSuspended()) {
      this.context.resume();
    }
  }

  private isSuspended(): boolean {
    return this.context.state === 'suspended';
  }

  public play({ buffer, loop = false, start = 0, end }: PlayOptions): void {
    const source = this.context.createBufferSource();
    source.buffer = buffer;

    if (loop) source.loop = true;

    source.addEventListener('ended', () => {
      this.playing.delete(buffer);
    });

    this.stop(buffer);
    this.playing.set(buffer, source);

    source.connect(this.context.destination);
    source.start(start, 0, end);
  }

  public stop(buffer: AudioBuffer): void {
    if (this.playing.has(buffer)) {
      this.playing.get(buffer)?.stop(0);
      this.playing.delete(buffer);
    }
  }

  public setMuted(value: boolean): void {
    this.gainNode.gain.value = value ? 0 : 1;
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
