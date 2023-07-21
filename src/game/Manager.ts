import {
  StateMachine,
  type Layer,
  type Audio,
  type ImageAssets,
  type AudioAssets,
  type FontAssets,
  ReturnImageAssets,
  ReturnAudioAssets,
} from '@/engine';
import { type Config } from './Config';
import { LoadingScene } from './scenes/LoadingScene';
import { type Scene } from './scenes/Scene';
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
  fontAssets: FontAssets;
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
  }

  public addState(name: Scenes, scene: Scene): StateMachine {
    return super.addState(name, scene);
  }

  public setState(name: Scenes): void {
    super.setState(name);
  }

  public getState(): Scene {
    return super.getState() as Scene;
  }

  public getConfig(): Config {
    return this.config;
  }

  public getImages(): GlobalImages {
    return this.images;
  }

  public getSounds(): GlobalSounds {
    return this.sounds;
  }

  public setImages(images: GlobalImages): void {
    this.images = images;
  }

  public setSounds(sounds: GlobalSounds): void {
    this.sounds = sounds;
  }

  public getImageAssets(): ImageAssets {
    return this.imageAssets;
  }

  public getAudioAssets(): AudioAssets {
    return this.audioAssets;
  }

  public getLayers(): Record<Layers, Layer> {
    return this.layers;
  }

  public getFontAssets(): FontAssets {
    return this.fontAssets;
  }
}
