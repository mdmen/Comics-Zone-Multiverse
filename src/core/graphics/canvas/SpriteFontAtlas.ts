interface ImageFontGlyphOffset {
  left?: number;
  right?: number;
}

interface ImageFontGlyph {
  x: number;
  width: number;
  offset?: ImageFontGlyphOffset;
}

export interface ImageFontAtlas {
  rows: string[];
  rowHeight: number;
  glyphs: Record<string, ImageFontGlyph>;
}
