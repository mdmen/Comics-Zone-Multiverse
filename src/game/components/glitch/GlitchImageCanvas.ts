import { Picture, type PictureOptions, type LayerCanvas } from '@/core';
import { getRandomInteger } from '@/game/helpers';

// Based on https://codepen.io/dimaZubkov/pen/EgmobE
export class GlitchImageCanvas extends Picture {
  protected layer!: LayerCanvas;
  private imageOffset;
  private delay = 0;
  private delayMin = 50;
  private delayMax = 200;
  private playing = false;
  private lastGenerateTime = 0;
  private cache?: ImageData;

  constructor(options: PictureOptions) {
    super(options);

    this.imageOffset = this.width * 0.01;

    this.drawGlitch = this.drawGlitch.bind(this);
    this.glitchBlock = this.glitchBlock.bind(this);
    this.glitchLine = this.glitchLine.bind(this);
  }

  private pixelFlick(i: number, d: Uint8ClampedArray) {
    d[i] = d[i + 16];
  }

  private glitchBlock(x: number, y: number) {
    const context = this.layer.getContext();
    const height = 1 + getRandomInteger(0, 10);

    context.drawImage(
      this.layer.getNode(),
      x,
      y,
      x,
      height,
      getRandomInteger(0, x),
      y,
      getRandomInteger(x, this.width),
      height
    );
  }

  private glitchLine(x: number, y: number) {
    const context = this.layer.getContext();
    const height = 1 + getRandomInteger(1, 50);

    context.drawImage(
      this.layer.getNode(),
      this.imageOffset,
      y,
      this.width - this.imageOffset * 2,
      height,
      1 + getRandomInteger(0, this.imageOffset * 2),
      y + getRandomInteger(0, 10),
      this.width - this.imageOffset,
      height
    );
  }

  private processPixels(
    imageData: ImageData,
    callback: (i: number, data: Uint8ClampedArray) => void
  ) {
    const data = imageData.data || [];

    if (!data.length) return imageData;

    for (let i = 0; i < data.length; i += 4) {
      callback && callback(i, data);
    }

    return imageData;
  }

  private drawGlitch(amount = 10, callback: (x: number, y: number) => void) {
    for (let i = 0; i < amount; i++) {
      const x = Math.random() * this.width + 1;
      const y = Math.random() * this.height + 1;

      callback(x, y);
    }
  }

  private flickImage() {
    const context = this.layer.getContext();
    const position = this.getPosition();

    let imageData = this.getImageData();

    imageData = this.processPixels(imageData, this.pixelFlick);
    context.putImageData(imageData, position.x, position.y);
  }

  private drawInitialImage() {
    if (!this.image) return;

    const context = this.layer.getContext();
    const position = this.getPosition();

    context.drawImage(
      this.image.getSource(),
      position.x,
      position.y,
      this.width,
      this.height
    );
  }

  private getImageData(): ImageData {
    const context = this.layer.getContext();
    const position = this.getPosition();

    return context.getImageData(
      position.x,
      position.y,
      this.width,
      this.height
    );
  }

  draw() {
    super.draw();

    if (!this.playing || !this.isLoaded()) return;

    const context = this.layer.getContext();
    const position = this.getPosition();
    const now = performance.now();

    if (this.cache && this.delay + this.lastGenerateTime > now) {
      context.putImageData(this.cache, position.x, position.y);
      return;
    }

    this.lastGenerateTime = now;
    this.delay = getRandomInteger(this.delayMin, this.delayMax);

    this.drawInitialImage();
    this.flickImage();

    this.drawGlitch(getRandomInteger(3, 10), this.glitchBlock);
    this.drawGlitch(getRandomInteger(3, 30), this.glitchLine);

    this.cache = this.getImageData();
  }

  start() {
    this.playing = true;
  }

  stop() {
    this.playing = false;
  }
}
