import { Vector } from '../geometries';
import { getFlippedImageCanvas, getScaledImageSource } from '../utils';
import { Drawable, type DrawableOptions } from './Drawable';
import { createImage } from './factories';
import { type Image } from './images';
import { LayerDOM } from './layers/LayerDOM';
import { ImageNode } from './nodes/ImageNode';

export interface PictureOptions extends DrawableOptions {
  image: HTMLImageElement;
  skipImageCreation?: boolean;
  flippable?: boolean;
  scale?: number;
  onCreate?: (picture: Picture) => void;
}

export class Picture extends Drawable {
  private flippedImage: Image | null = null;
  protected image: Image | null = null;
  protected domNode!: ImageNode | null;
  protected source = new Vector();

  protected readonly flippable;
  protected flipped = false;
  protected scale;

  constructor({
    image,
    scale = 1,
    flippable = false,
    skipImageCreation = false,
    onCreate = () => {},
    ...options
  }: PictureOptions) {
    super(options);

    this.scale = scale;
    this.flippable = flippable;

    if (!skipImageCreation) {
      this.createImages(image, onCreate);

      // precalculate image size before scaled image loaded
      this.width = image.naturalWidth * scale;
      this.height = image.naturalHeight * scale;
    }
  }

  private async createImages(
    image: HTMLImageElement,
    onCreate: (image: Picture) => void
  ) {
    const scaled = await getScaledImageSource(image, this.scale);

    [this.image, this.flippedImage] = await Promise.all([
      createImage(scaled),
      (async () => {
        if (!this.flippable) return null;

        const flipped = await getFlippedImageCanvas(scaled);
        return createImage(flipped);
      })(),
    ]);

    this.width = this.image.getWidth();
    this.height = this.image.getHeight();

    onCreate(this);
  }

  protected createDomNode() {
    return new ImageNode(this.layer as LayerDOM, this);
  }

  isLoaded() {
    return !!this.image?.isLoaded();
  }

  isFlipped() {
    return this.flipped;
  }

  getSource() {
    return this.source;
  }

  getImage() {
    return this.image;
  }

  flip() {
    if (!this.flippable) return;

    [this.image, this.flippedImage] = [this.flippedImage as Image, this.image];
    this.flipped = !this.flipped;

    this.domNode?.flip();
  }

  draw() {
    super.draw();

    if (this.isLoaded()) {
      this.layer.drawImage(this);
    }
  }

  destroy() {
    super.destroy();

    this.image?.destroy();
    this.image = null as unknown as Image;

    this.flippedImage?.destroy();
    this.flippedImage = null;
  }
}
