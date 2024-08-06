import type {
  Layer,
  GameAudio,
  ImageLoader,
  AudioAssets,
  ImageFontAssets,
  Sounds,
  ReturnImageAssets,
  ReturnAudioAssets,
  ReturnImageFontAssets,
} from '@/core';
import { StateMachine } from '@/core';
import { type Config } from './Config';
import { type Scene } from './scenes/Scene';
import { Scenes } from './scenes/scenes';
import { type Input } from './Input';
import { globalImages } from '@/assets/images';
import { globalSounds } from '@/assets/sounds';
import { globalFonts } from '@/assets/fonts';
import type { LayerType } from './types';

type GlobalImageAssets = ReturnImageAssets<typeof globalImages>;
type GlobalSoundAssets = ReturnAudioAssets<typeof globalSounds>;
type GlobalFontAssets = ReturnImageFontAssets<typeof globalFonts>;

interface Options {
  config: Config;
  audio: GameAudio;
  imageAssets: ImageLoader;
  audioAssets: AudioAssets;
  fontAssets: ImageFontAssets;
  layers: Record<LayerType, Layer>;
  input: Input;
}

export class Manager extends StateMachine {
  private readonly config;
  private readonly audio;
  private readonly imageAssets;
  private readonly audioAssets;
  private readonly fontAssets;
  private readonly input;
  private layers;

  // should be loaded during loading scene
  private globalImages!: ReturnImageAssets<typeof globalImages>;
  private globalSounds!: Sounds<GlobalSoundAssets>;
  private globalFonts!: GlobalFontAssets;

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
  }

  addScene(name: Scenes, scene: Scene) {
    return super.addState(name, scene);
  }

  setScene(name: Scenes) {
    super.setState(name);
  }

  getScene(key?: Scenes) {
    return super.getState(key) as Scene;
  }

  getConfig() {
    return this.config;
  }

  getGlobalImages() {
    return this.globalImages;
  }

  getGlobalSounds() {
    return this.globalSounds;
  }

  setGlobalImages(images: GlobalImageAssets) {
    this.globalImages = images;
  }

  setGlobalSounds(sounds: Sounds<GlobalSoundAssets>) {
    this.globalSounds = sounds;
  }

  setGlobalFonts(fonts: GlobalFontAssets) {
    this.globalFonts = fonts;
  }

  getGlobalFonts() {
    return this.globalFonts;
  }

  getImageAssets() {
    return this.imageAssets;
  }

  getAudioAssets() {
    return this.audioAssets;
  }

  getAudio() {
    return this.audio;
  }

  setLayers(layers: Record<LayerType, Layer>) {
    this.layers = layers;
  }

  getLayers() {
    return this.layers;
  }

  getFontAssets() {
    return this.fontAssets;
  }
}
