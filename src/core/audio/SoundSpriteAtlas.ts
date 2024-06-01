interface SoundSpriteSegment {
  start: number;
  end: number;
}

export interface SoundSpriteAtlas {
  segments: Record<string, SoundSpriteSegment>;
}
