import type { Audio } from './Audio';
import { SoundSprite } from './SoundSprite';
import { Sound } from './Sound';
import { Logger } from '../debug/Logger';
import type { AudioSpriteAsset, AudioAsset } from '../assets/AssetsAudio';

type ResultSounds<T> = Record<keyof T, Sound | SoundSprite>;

export class Sounds<
  Resources extends Record<string, AudioAsset | AudioSpriteAsset>
> {
  private readonly audio;
  private sounds;

  constructor(resources: Resources, audio: Audio) {
    this.audio = audio;
    this.sounds = this.extract(resources);
  }

  private extract(resources: Resources): ResultSounds<Resources> {
    const sounds = {} as ResultSounds<Resources>;

    try {
      Object.keys(resources).forEach(async (name: keyof Resources) => {
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

  private async createSound(arrayBuffer: AudioAsset): Promise<Sound> {
    const context = this.audio.getContext();
    const buffer = await context.decodeAudioData(arrayBuffer);
    const source = new AudioBufferSourceNode(context, { buffer });

    source.connect(context.destination);

    return new Sound(source);
  }

  private async createSpriteSound(
    resource: AudioSpriteAsset
  ): Promise<SoundSprite> {
    const context = this.audio.getContext();
    const { buffer: arrayBuffer, data } = resource;
    const buffer = await context.decodeAudioData(arrayBuffer);
    const source = new AudioBufferSourceNode(context, { buffer });

    source.connect(context.destination);

    return new SoundSprite(source, data);
  }

  public play<Key extends keyof Resources>(
    ...args: Resources[Key] extends AudioSpriteAsset
      ? [
          Key,
          Resources[Key] extends AudioSpriteAsset<infer Segments>
            ? Segments
            : never
        ]
      : [Key]
  ): void {
    try {
      const [name, segment] = args;
      const resource = this.sounds[name];
      resource.play(segment as string);
    } catch (error) {
      Logger.error(error);
    }
  }

  public stop(name: keyof Resources): void {
    try {
      this.sounds[name].stop();
    } catch (error) {
      Logger.error(error);
    }
  }

  public clear(): void {
    const context = this.audio.getContext();

    Object.keys(this.sounds).forEach((name) => {
      const source = this.sounds[name].getSource();
      source.disconnect(context.destination);
    });

    this.sounds = {} as ResultSounds<Resources>;
  }
}
