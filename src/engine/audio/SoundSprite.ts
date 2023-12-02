import { Sound } from './Sound';
import type { SoundSpriteData } from '../assets/types';

export class SoundSprite extends Sound {
  private data;

  constructor(source: AudioBufferSourceNode, data: SoundSpriteData) {
    super(source);

    this.data = data;
  }

  play(segment: string) {
    const { start, end } = this.data.map[segment];

    this.source.start(0, start, end);
  }

  destroy() {
    super.destroy();

    this.data = null as unknown as SoundSpriteData;
  }
}
