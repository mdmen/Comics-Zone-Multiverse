import { Settings } from '../Settings';
import { Vector } from '../geometries';
import { getFlippedImage, getScaledImage } from '../utils';
import { Drawable, type DrawableOptions } from './Drawable';
import { type Image, HTMLImage, CanvasImage } from './images';
import { LayerDOM } from './layers/LayerDOM';
import { ImageNode } from './nodes/ImageNode';

export interface PictureOptions extends DrawableOptions {
  image: HTMLImageElement;
  flippable?: boolean;
  scale?: number;
  onCreate?: (image: Picture) => void;
}

export class Picture extends Drawable {
  protected image!: Image;
  protected flippedImage: Image | null = null;
  protected domNode!: ImageNode | null;
  protected source = new Vector();
  protected flipped = false;
  protected loaded = false;

  constructor({
    image,
    scale = 1,
    flippable = false,
    onCreate = () => {},
    ...options
  }: PictureOptions) {
    super(options);

    this.createImages(image, flippable, scale, onCreate);

    // precalculate image size before scaled image loaded
    this.width = Math.floor(image.width * scale);
    this.height = Math.floor(image.height * scale);
  }

  private async createImages(
    image: HTMLImageElement,
    flippable: boolean,
    scale: number,
    onCreate: (image: Picture) => void
  ): Promise<void> {
    const scaled = await getScaledImage(image, scale);
    this.image = this.createImage(scaled);

    if (flippable) {
      const flipped = await getFlippedImage(scaled);
      this.flippedImage = this.createImage(flipped);
    }

    this.width = this.image.getWidth();
    this.height = this.image.getHeight();

    onCreate(this);

    if (Settings.isDOMEngine()) {
      this.domNode?.updateImage();
    }

    this.loaded = true;
  }

  private createImage(source: HTMLImageElement): Image {
    return Settings.isDOMEngine()
      ? new HTMLImage(source)
      : new CanvasImage(source);
  }

  protected createDomNode(): ImageNode {
    return new ImageNode({ layer: this.layer as LayerDOM, drawable: this });
  }

  getSource(): Vector {
    return this.source;
  }

  getImage(): Image {
    return this.image;
  }

  flip() {
    [this.image, this.flippedImage] = [this.flippedImage as Image, this.image];
    this.flipped = !this.flipped;

    this.domNode?.flip();
  }

  draw() {
    super.draw();

    if (this.loaded && this.image.isLoaded()) {
      this.layer.drawImage(this);
    }
  }

  destroy() {
    super.destroy();

    this.image.destroy();
    this.image = null as unknown as Image;

    this.flippedImage?.destroy();
    this.flippedImage = null;
  }
}
