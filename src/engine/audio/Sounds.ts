import type { Audio } from './Audio';
import { SoundSprite } from './SoundSprite';
import { Sound } from './Sound';
import { Logger } from '../Logger';
import type { AudioSpriteAsset } from '../assets/types';
import { isEmpty } from '../utils';

type ResultSounds<Assets> = Record<keyof Assets, Sound | SoundSprite>;

type AudioAssets = Record<string, ArrayBuffer | AudioSpriteAsset>;

export class Sounds<Assets extends AudioAssets = AudioAssets> {
  private readonly audio;
  private sounds;

  constructor(resources: Assets, audio: Audio) {
    this.sounds = this.extract(resources);
    this.audio = audio;
  }

  private extract(resources: Assets) {
    const sounds = {} as ResultSounds<Assets>;

    try {
      const names = Object.keys(resources);

      if (isEmpty(names)) {
        throw Error('There are no sounds');
      }

      names.forEach(async (name: keyof Assets) => {
        const resource = resources[name];

        if (resource instanceof ArrayBuffer) {
          sounds[name] = await this.createSound(resource);
          return;
        }

        sounds[name] = await this.createSpriteSound(resource);
      });
    } catch (error) {
      Logger.error(error);
    }

    return sounds;
  }

  private async createSound(arrayBuffer: ArrayBuffer) {
    const context = this.audio.getContext();
    const buffer = await context.decodeAudioData(arrayBuffer);
    const source = new AudioBufferSourceNode(context, { buffer });

    source.connect(context.destination);

    return new Sound(source);
  }

  private async createSpriteSound(resource: AudioSpriteAsset) {
    const context = this.audio.getContext();
    const buffer = await context.decodeAudioData(resource.buffer);
    const source = new AudioBufferSourceNode(context, { buffer });

    source.connect(context.destination);

    return new SoundSprite(source, resource.data);
  }

  play<Key extends keyof Assets>(
    ...args: Assets[Key] extends AudioSpriteAsset
      ? [
          Key,
          Assets[Key] extends AudioSpriteAsset<infer Segments>
            ? Segments
            : never
        ]
      : [Key]
  ) {
    try {
      const [name, segment] = args;
      const resource = this.sounds[name];

      if (!resource) {
        throw Error(`There is no "${String(name)}" sound`);
      }

      resource.play(segment as string);
    } catch (error) {
      Logger.error(error);
    }
  }

  stop(name: keyof Assets) {
    try {
      const sound = this.sounds[name];

      if (!sound) {
        throw Error(`There is no "${String(name)}" sound`);
      }

      sound.stop();
    } catch (error) {
      Logger.error(error);
    }
  }

  clear() {
    Object.keys(this.sounds).forEach((name) => {
      this.sounds[name].destroy();
    });

    this.sounds = null as unknown as ResultSounds<Assets>;
  }
}
