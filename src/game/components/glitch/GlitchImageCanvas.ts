import {
  Image,
  type ImageOptions,
  type LayerCanvas,
  getRandomInteger,
} from '@/engine';

interface Options extends ImageOptions {
  delayMin?: number;
  delayMax?: number;
}

// Based on https://codepen.io/dimaZubkov/pen/EgmobE
export class GlitchImageCanvas extends Image {
  protected layer!: LayerCanvas;
  private offset;
  private delay = 0;
  private delayMin;
  private delayMax;
  private playing = false;
  private lastGenerateTime = 0;
  private cache?: ImageData;

  constructor({ delayMin = 50, delayMax = 200, ...options }: Options) {
    super(options);

    if (delayMin > delayMax) {
      throw Error('delayMin should be greater or equal delayMax');
    }

    this.offset = this.width * 0.01;
    this.delayMin = delayMin;
    this.delayMax = delayMax;

    this.drawGlitch = this.drawGlitch.bind(this);
    this.glitchBlock = this.glitchBlock.bind(this);
    this.glitchLine = this.glitchLine.bind(this);
  }

  private pixelFlick(i: number, d: Uint8ClampedArray): void {
    d[i] = d[i + 16];
  }

  private glitchBlock(x: number, y: number): void {
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

  private glitchLine(x: number, y: number): void {
    const context = this.layer.getContext();
    const height = 1 + getRandomInteger(1, 50);

    context.drawImage(
      this.layer.getNode(),
      this.offset,
      y,
      this.width - this.offset * 2,
      height,
      1 + getRandomInteger(0, this.offset * 2),
      y + getRandomInteger(0, 10),
      this.width - this.offset,
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

  private flickImage(): void {
    const context = this.layer.getContext();
    const position = this.getPosition();

    let imageData = this.getImageData();

    imageData = this.processPixels(imageData, this.pixelFlick);
    context.putImageData(imageData, position.x, position.y);
  }

  private drawInitialImage(): void {
    const context = this.layer.getContext();
    const position = this.getPosition();

    context.drawImage(
      this.image,
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

  public draw(): void {
    super.draw();

    if (!this.playing || !this.loaded) return;

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

  public start(): void {
    this.playing = true;
  }

  public stop(): void {
    this.playing = false;
  }
}
