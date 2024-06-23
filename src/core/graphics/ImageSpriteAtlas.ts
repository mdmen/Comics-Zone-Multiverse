interface ImageSpriteBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ImageSpriteOffset {
  x: number;
  y: number;
}

export interface ImageSpriteFrame {
  frame: ImageSpriteBounds;
  offset?: ImageSpriteOffset;
}

export interface ImageSpriteAtlas<
  Frame extends ImageSpriteFrame = ImageSpriteFrame
> {
  frames: Record<string, Frame>;
}
