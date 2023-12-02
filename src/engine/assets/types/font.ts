interface GlyphOffset {
  left: number;
  right: number;
}

export interface ImageFontGlyph {
  x: number;
  width: number;
  offset: GlyphOffset;
}

export interface ImageFontData {
  rows: string[];
  rowHeight: number;
  glyphs: Record<string, ImageFontGlyph>;
}

export interface ImageFontAsset {
  image: HTMLImageElement;
  data: ImageFontData;
}

export type ReturnImageFontAssets<Sources> = {
  [Key in keyof Sources]: ImageFontAsset;
};
