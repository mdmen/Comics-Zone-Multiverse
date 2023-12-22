import { type Sounds, type ReturnAudioAssets } from '@/engine';
import { Character, type CharacterOptions } from '../Character';
import { SketchIdleState } from './states';
import { globalSounds } from '@/assets/sounds';

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
    this.moveStates.addState('idle', new SketchIdleState({ character: this }));
  }

  getSounds(): SketchSounds {
    return this.sounds;
  }
}
