import { type Layer } from '../layers/Layer';
import { type LayerDOM } from '../layers/LayerDOM';
import { DrawableNode } from '../nodes';
import { Drawable, DrawableOptions } from '../Drawable';
import {
  createCanvas,
  createContext2D,
  extractImageFromCanvas,
  squashSpaces,
} from '../../utils';
import { type SpriteAsset } from '../../assets/types';
import { Settings } from '../../Settings';
import { Vector } from '../../math';

interface PrepareCallback {
  (text: string): string;
}

export interface ImageFontGlyph {
  x: number;
  width: number;
  offset: number;
}

export interface ImageFontData {
  rows: string[];
  rowHeight: number;
  glyphs: Record<string, ImageFontGlyph>;
}

interface Options extends Omit<DrawableOptions, 'layer'> {
  text: string;
  row?: string;
  scale?: number;
  maxWidth?: number;
  rowGap?: number;
}

interface GlobalOptions {
  layer: Layer;
  font: SpriteAsset<ImageFontData>;
  prepare?: PrepareCallback;
}

export class SpriteText extends Drawable {
  protected static layer: Layer;
  private static image: HTMLImageElement;
  private static data: ImageFontData;
  private static prepareCallback: PrepareCallback;

  private spriteImage;
  private text;
  private scale;
  private rowIndex;
  private maxWidth;
  private rowGap;

  // for compatibility reason
  private readonly source = new Vector();

  constructor({ text, scale, row, rowGap, maxWidth = 0, ...options }: Options) {
    super({ ...options, layer: SpriteText.layer });

    SpriteText.checkSetup();

    const prepared = SpriteText.prepareCallback(text);
    this.text = squashSpaces(prepared);

    this.maxWidth = maxWidth;
    this.rowIndex = this.getRowIndex(row);
    this.scale = scale || Settings.get('spriteFontScale');
    this.rowGap = rowGap || Settings.get('spriteFontRowGap');

    const [width, height] = this.calculateTextImageSize();
    this.width = width;
    this.height = height;
    this.spriteImage = this.createTextImage();
  }

  private static checkSetup(): void {
    if (![SpriteText.layer, SpriteText.data, SpriteText.image].every(Boolean)) {
      throw Error('You must setup Text component');
    }

    SpriteText.checkSetup = () => {};
  }

  private getRowIndex(row?: string): number {
    if (!row) return 0;

    const index = SpriteText.data.rows.indexOf(row);
    return Math.max(0, index);
  }

  protected createDomNode(): DrawableNode {
    return new DrawableNode({
      layer: this.layer as LayerDOM,
      drawable: this,
    });
  }

  private calculateWordWidth(word: string): number {
    const { glyphs } = SpriteText.data;
    let width = 0;

    for (const glyph of word) {
      width += glyphs[glyph].width * this.scale + glyphs[glyph].offset;
    }

    return Math.floor(width);
  }

  private calculateSpaceWidth(): number {
    const { width, offset } = SpriteText.data.glyphs[' '];

    return Math.floor(width * this.scale + offset);
  }

  private calculateTextImageSize(): [number, number] {
    const words = this.text.split(' ');
    const spaceWidth = this.calculateSpaceWidth();

    let maxWidth = 0;
    let width = 0;
    let height = SpriteText.data.rowHeight * this.scale;

    words.forEach((word, index) => {
      const wordWidth = this.calculateWordWidth(word);
      const space = index < words.length - 1 ? spaceWidth : 0;

      width += wordWidth + space;
      maxWidth = Math.max(width, maxWidth);

      if (this.maxWidth && width + wordWidth + space > this.maxWidth) {
        width = 0;
        height = (height + this.rowGap) * this.scale;
      }
    });

    return [maxWidth, Math.floor(height)];
  }

  private createTextImage(): HTMLImageElement {
    const words = this.text.split(' ');
    const { glyphs, rowHeight } = SpriteText.data;
    const spaceWidth = this.calculateSpaceWidth();
    const canvas = createCanvas(this.width, this.height);
    const context = createContext2D(canvas);

    let width = 0;
    let glyphPosX = 0;
    let glyphPosY = 0;

    words.forEach((word, wordIndex) => {
      for (let i = 0; i < word.length; i++) {
        const char = word[i];

        glyphPosX += glyphs[char].offset * this.scale;

        context.drawImage(
          SpriteText.image,
          glyphs[char].x,
          this.rowIndex * rowHeight,
          glyphs[char].width,
          rowHeight,
          Math.floor(glyphPosX),
          Math.floor(glyphPosY * this.scale),
          Math.floor(glyphs[char].width * this.scale),
          Math.floor(rowHeight * this.scale)
        );

        glyphPosX += glyphs[char].width * this.scale;

        const space = wordIndex < words.length - 1 ? spaceWidth : 0;
        const wordWidth = this.calculateWordWidth(word);

        if (this.maxWidth && width + wordWidth + space > this.maxWidth) {
          glyphPosY += this.rowGap + rowHeight;
          width = 0;
          glyphPosX = 0;
        }
      }
    });

    return extractImageFromCanvas(canvas);
  }

  public static setup({
    layer,
    font,
    prepare = (str) => str,
  }: GlobalOptions): void {
    SpriteText.layer = layer;
    SpriteText.image = font.image;
    SpriteText.data = font.data;
    SpriteText.prepareCallback = prepare;
  }

  public getImage(): HTMLImageElement {
    return this.spriteImage;
  }

  public getSource(): Vector {
    return this.source;
  }

  public draw(): void {
    this.layer.drawImage(this);
  }
}
