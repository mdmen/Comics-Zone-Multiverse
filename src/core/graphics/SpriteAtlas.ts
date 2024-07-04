interface SpriteBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpriteOffset {
  x?: number;
  y?: number;
}

export interface SpriteFrame {
  frame: SpriteBounds;
  offset?: SpriteOffset;
}

export interface SpriteAtlas<Frame extends SpriteFrame = SpriteFrame> {
  frames: Record<string, Frame>;
}
