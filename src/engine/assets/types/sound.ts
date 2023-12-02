import type { SpriteSource } from './common';

export interface SoundSpriteSegment {
  start: number;
  end: number;
}

export interface SoundSpriteData<Names extends PrimitiveKeys = string> {
  map: Record<Names, SoundSpriteSegment>;
}

export interface AudioSpriteAsset<Names extends PrimitiveKeys = string> {
  buffer: ArrayBuffer;
  data: SoundSpriteData<Names>;
}

export type ReturnAudioAssets<Sources> = {
  [Key in keyof Sources]: Sources[Key] extends SpriteSource<
    SoundSpriteData<string>
  >
    ? AudioSpriteAsset<keyof Sources[Key]['data']['map']>
    : ArrayBuffer;
};
