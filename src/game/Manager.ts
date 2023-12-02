import {
  StateMachine,
  type Layer,
  type Audio,
  type ImageAssets,
  type AudioAssets,
  type ImageFontAssets,
  ReturnImageAssets,
  ReturnAudioAssets,
} from '@/engine';
import { type Config } from './Config';
import { type Scene, LoadingScene, IntroScene } from './scenes';
import { type Input } from './Input';
import { globalImages, globalSounds } from '@/constants';

type Layers = 'top' | 'middle' | 'bottom';
type GlobalImages = ReturnImageAssets<typeof globalImages>;
type GlobalSounds = ReturnAudioAssets<typeof globalSounds>;

export enum Scenes {
  LOADING = 'loading',
  INTRO = 'intro',
}

interface Options {
  config: Config;
  audio: Audio;
  imageAssets: ImageAssets;
  audioAssets: AudioAssets;
  fontAssets: ImageFontAssets;
  layers: Record<Layers, Layer>;
  input: Input;
}

export class Manager extends StateMachine {
  private readonly config;
  private readonly audio;
  private readonly imageAssets;
  private readonly audioAssets;
  private readonly fontAssets;
  private readonly layers;
  private readonly input;

  // should be loaded during loading scene
  private images!: GlobalImages;
  private sounds!: GlobalSounds;

  constructor({
    config,
    audio,
    imageAssets,
    audioAssets,
    fontAssets,
    layers,
    input,
  }: Options) {
    super();

    this.config = config;
    this.audio = audio;
    this.imageAssets = imageAssets;
    this.audioAssets = audioAssets;
    this.fontAssets = fontAssets;
    this.layers = layers;
    this.input = input;

    this.addState(Scenes.LOADING, new LoadingScene(this));
    this.addState(Scenes.INTRO, new IntroScene(this));
  }

  addState(name: Scenes, scene: Scene): StateMachine {
    return super.addState(name, scene);
  }

  setState(name: Scenes) {
    super.setState(name);
  }

  getState(key?: Scenes): Scene {
    return super.getState(key) as Scene;
  }

  getConfig(): Config {
    return this.config;
  }

  getImages(): GlobalImages {
    return this.images;
  }

  getSounds(): GlobalSounds {
    return this.sounds;
  }

  setGlobalImages(images: GlobalImages) {
    this.images = images;
  }

  setGlobalSounds(sounds: GlobalSounds) {
    this.sounds = sounds;
  }

  getImageAssets(): ImageAssets {
    return this.imageAssets;
  }

  getAudioAssets(): AudioAssets {
    return this.audioAssets;
  }

  getLayers(): Record<Layers, Layer> {
    return this.layers;
  }

  getFontAssets(): ImageFontAssets {
    return this.fontAssets;
  }
}
