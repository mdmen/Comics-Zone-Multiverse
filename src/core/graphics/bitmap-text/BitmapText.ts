import {
  createCanvas,
  createContext2D,
  getScaledImage,
  squashSpaces,
} from '../utils';
import type { ImageFontData, ImageFontGlyph } from '../assets/types';
import { type PictureOptions, Sprite } from './Sprite';
import { createImage } from './images';

export interface TextOptions extends PictureOptions {
  image: HTMLImageElement;
  text: string;
  data: ImageFontData;
  row?: string;
  maxWidth?: number;
  rowGap?: number;
  centered?: boolean;
}

export class Text extends Sprite {
  private fontImage: HTMLImageElement;
  private data;
  private text!: string;
  private rowIndex;
  private maxWidth;
  private rowGap;
  private centered;
  private onCreate;

  constructor({
    text,
    data,
    row,
    centered = false,
    rowGap = 1,
    maxWidth = 0,
    image,
    onCreate = () => {},
    ...options
  }: TextOptions) {
    super(options);

    this.data = data;
    this.maxWidth = maxWidth;
    this.onCreate = onCreate;
    this.rowIndex = this.getRowIndex(row);
    this.rowGap = rowGap;
    this.centered = centered;
    this.fontImage = image;

    this.setText(text);
  }

  private getRowIndex(row?: string) {
    if (!row) return 0;

    const index = this.data.rows.indexOf(row);
    return Math.max(0, index);
  }

  private calculateWordWidth(word: string) {
    return word.split('').reduce((acc, char, index) => {
      const { width, offset = {} } = this.data.glyphs[char];
      const leftOffset = offset.left || 0;
      const rightOffset = offset.right || 0;

      return acc + (index > 0 ? leftOffset : 0) + width + rightOffset;
    }, 0);
  }

  private getSpaceWidth(): number {
    return this.data.glyphs[' '].width;
  }

  private calculateTextImageSize() {
    const words = this.text.split(' ');

    if (words.length === 1) {
      const rowWidth = this.calculateWordWidth(words[0]);
      const { rowHeight } = this.data;
      return [rowWidth, rowHeight];
    }

    const spaceWidth = this.getSpaceWidth();
    let { rowHeight } = this.data;
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
        rowHeight += this.data.rowHeight + this.rowGap;
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
  ) {
    const { rowHeight } = this.data;

    context.drawImage(
      this.fontImage,
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

  private findPosXForCenteredRow(words: string[], currentIndex: number) {
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

  private async createTextImage() {
    const canvas = createCanvas(...this.calculateTextImageSize());
    const context = createContext2D(canvas);
    const words = this.text.split(' ');
    const { glyphs, rowHeight } = this.data;
    const spaceWidth = this.getSpaceWidth();

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

      if (glyphPosX === 0 && this.centered) {
        glyphPosX = this.findPosXForCenteredRow(words, wordIndex);
      }

      for (let i = 0; i < word.length; i++) {
        const glyph = glyphs[word[i]];
        const hasOffset = rowWidth > 0 || i > 0;

        glyphPosX += hasOffset ? glyph.offset?.left || 0 : 0;

        this.drawGlyph(context, glyph, glyphPosX, glyphPosY);

        glyphPosX += glyph.width + (glyph.offset?.right || 0);
      }

      this.drawGlyph(context, glyphs[' '], glyphPosX, glyphPosY);

      glyphPosX += spaceWidth;
      rowWidth += spaceWidth + wordWidth;
    });

    return canvas;
  }

  async setText(text: string) {
    this.text = squashSpaces(text);

    const canvas = await this.createTextImage();
    const scaled = await getScaledImage(canvas, this.scale);
    const image = await createImage(scaled);

    this.setImage(image);
    this.onCreate(this);
  }

  destroy() {
    super.destroy();

    this.data = null as unknown as ImageFontData;
    this.fontImage = null as unknown as HTMLImageElement;
  }
}
