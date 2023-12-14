import { type Sounds, type ReturnAudioAssets } from '@/engine';
import { Character, type CharacterOptions } from '../Character';
import { SketchIdleState } from './states';
import { globalSounds } from '@/constants';

type SketchSounds = Sounds<ReturnAudioAssets<typeof globalSounds>>;

interface SketchOptions extends CharacterOptions {
  sounds: SketchSounds;
}

export class Sketch extends Character {
  protected readonly sounds;

  constructor({ sounds, ...options }: SketchOptions) {
    super(options);

    this.sounds = sounds;

    this.addStates();
  }

  private addStates() {
    this.moveStates.addScene('idle', new SketchIdleState({ character: this }));
  }

  getSounds(): SketchSounds {
    return this.sounds;
  }
}
