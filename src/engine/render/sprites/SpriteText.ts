import { type Layer } from '../layers/Layer';
import { type LayerDOM } from '../layers/LayerDOM';
import { DrawableNode } from '../nodes';
import { Drawable, DrawableOptions } from '../Drawable';
import {
  createCanvas,
  createContext2D,
  extractImageFromCanvas,
  getScaledImage,
  squashSpaces,
} from '../../utils';
import { type SpriteAsset } from '../../assets/types';
import { Settings } from '../../Settings';
import { Vector } from '../../math';

interface TransformCallback {
  (text: string): string;
}

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

interface Options extends Omit<DrawableOptions, 'layer'> {
  text: string;
  row?: string;
  scale?: number;
  maxWidth?: number;
  rowGap?: number;
  center?: boolean;
}

interface GlobalOptions {
  layer: Layer;
  font: SpriteAsset<ImageFontData>;
  transform?: TransformCallback;
}

export class SpriteText extends Drawable {
  protected static layer: Layer;
  private static spriteImage: HTMLImageElement;
  private static data: ImageFontData;
  private static transform: TransformCallback;

  private image!: HTMLImageElement;
  private text!: string;
  private loaded = false;
  private scale;
  private rowIndex;
  private maxWidth;
  private rowGap;
  private center;

  // for compatibility reason
  private readonly source = new Vector();

  constructor({
    text,
    center,
    scale,
    row,
    rowGap,
    maxWidth = 0,
    ...options
  }: Options) {
    super({ ...options, layer: SpriteText.layer });

    SpriteText.checkSetup();

    this.maxWidth = maxWidth;
    this.rowIndex = this.getRowIndex(row);
    this.scale = scale || Settings.get('spriteFontScale');
    this.rowGap = rowGap || Settings.get('spriteFontRowGap');
    this.center = center || Settings.get('spriteFontCenter');

    this.setText(text);
  }

  private prepareText(text: string): string {
    return squashSpaces(SpriteText.transform(text));
  }

  private static checkSetup(): void {
    const requiredProps = [
      SpriteText.layer,
      SpriteText.data,
      SpriteText.spriteImage,
    ];

    if (!requiredProps.every(Boolean)) {
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
    return word.split('').reduce((acc, char, index) => {
      const { width, offset } = SpriteText.data.glyphs[char];

      return acc + (index > 0 ? offset.left : 0) + width + offset.right;
    }, 0);
  }

  private getSpaceWidth(): number {
    return SpriteText.data.glyphs[' '].width;
  }

  private normalizeSizes(sizes: number[]): number[] {
    return sizes.map((value) => Math.floor(value * this.scale));
  }

  private calculateTextImageSize(): number[] {
    const words = this.text.split(' ');

    if (words.length === 1) {
      const rowWidth = this.calculateWordWidth(words[0]);
      const { rowHeight } = SpriteText.data;
      return [rowWidth, rowHeight];
    }

    const spaceWidth = this.getSpaceWidth();
    let { rowHeight } = SpriteText.data;
    let rowWidth = 0;
    let maxRowWidth = 0;

    words.forEach((word, index) => {
      const wordWidth = this.calculateWordWidth(word);

      if (
        this.maxWidth &&
        index > 0 &&
        rowWidth + spaceWidth + wordWidth > this.maxWidth
      ) {
        rowWidth = 0;
        rowHeight += SpriteText.data.rowHeight + this.rowGap;
      }

      rowWidth += wordWidth + (rowWidth > 0 ? spaceWidth : 0);
      maxRowWidth = Math.max(rowWidth, maxRowWidth);
    });

    return [maxRowWidth, rowHeight];
  }

  private drawGlyph(
    context: CanvasRenderingContext2D,
    glyph: ImageFontGlyph,
    dx: number,
    dy: number
  ): void {
    const { rowHeight } = SpriteText.data;

    context.drawImage(
      SpriteText.spriteImage,
      glyph.x,
      this.rowIndex * rowHeight,
      glyph.width,
      rowHeight,
      Math.floor(dx),
      Math.floor(dy),
      Math.floor(glyph.width),
      Math.floor(rowHeight)
    );
  }

  private findPosXForCenteredRow(
    words: string[],
    currentIndex: number
  ): number {
    if (!this.maxWidth) return 0;

    const spaceWidth = this.getSpaceWidth();
    let rowWidth = 0;

    for (let i = currentIndex; i < words.length; i++) {
      const wordWidth = this.calculateWordWidth(words[i]);

      rowWidth += wordWidth + spaceWidth;

      const posX = Math.floor(this.maxWidth / 2 - rowWidth / 2);
      const nextWord = words[i + 1];

      if (!nextWord) {
        return posX;
      }

      const nextWordWidth = this.calculateWordWidth(nextWord);
      const overallWidth = rowWidth + spaceWidth + nextWordWidth;

      if (overallWidth >= this.maxWidth) {
        return posX;
      }
    }

    return 0;
  }

  private async createTextImage(): Promise<void> {
    const canvas = createCanvas(...this.calculateTextImageSize());
    const context = createContext2D(canvas);
    const words = this.text.split(' ');
    const { glyphs, rowHeight } = SpriteText.data;
    const spaceWidth = this.getSpaceWidth();

    context.save();
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, this.width, this.height);
    context.restore();

    let rowWidth = 0;
    let glyphPosX = 0;
    let glyphPosY = 0;

    words.forEach((word, wordIndex) => {
      const wordWidth = this.calculateWordWidth(word);
      const lineBreak =
        this.maxWidth &&
        wordIndex > 0 &&
        rowWidth > 0 &&
        rowWidth + wordWidth > this.maxWidth;

      if (lineBreak) {
        glyphPosX = 0;
        rowWidth = 0;
        glyphPosY += this.rowGap + rowHeight;
      }

      if (glyphPosX === 0 && this.center) {
        glyphPosX = this.findPosXForCenteredRow(words, wordIndex);
      }

      for (let i = 0; i < word.length; i++) {
        const glyph = glyphs[word[i]];
        const hasOffset = rowWidth > 0 || i > 0;

        glyphPosX += hasOffset ? glyph.offset.left : 0;

        this.drawGlyph(context, glyph, glyphPosX, glyphPosY);

        glyphPosX += glyph.width + glyph.offset.right;
      }

      this.drawGlyph(context, glyphs[' '], glyphPosX, glyphPosY);
      glyphPosX += spaceWidth;
      rowWidth += spaceWidth + wordWidth;
    });

    const image = await extractImageFromCanvas(canvas);
    this.image = await getScaledImage(image, this.scale);

    this.loaded = true;
  }

  public setText(text: string): void {
    this.text = this.prepareText(text);

    [this.width, this.height] = this.normalizeSizes(
      this.calculateTextImageSize()
    );

    this.createTextImage();
  }

  public static setup({
    layer,
    font,
    transform = (str) => str,
  }: GlobalOptions): void {
    SpriteText.layer = layer;
    SpriteText.spriteImage = font.image;
    SpriteText.data = font.data;
    SpriteText.transform = transform;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getSource(): Vector {
    return this.source;
  }

  public draw(): void {
    this.loaded && this.layer.drawImage(this);
  }
}
