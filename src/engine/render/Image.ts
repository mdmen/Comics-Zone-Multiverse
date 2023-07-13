import { Vector } from '../math';
import { getReversedImage, getScaledImage } from '../utils';
import { Drawable, type DrawableOptions } from './Drawable';
import { LayerDOM } from './layers/LayerDOM';
import { ImageNode } from './nodes/ImageNode';

export interface ImageOptions extends DrawableOptions {
  image: HTMLImageElement;
  flippable?: boolean;
  scale?: number;
}

type ImagesType = 'straight' | 'reversed';
type Images = Record<ImagesType, HTMLImageElement>;

export abstract class Image extends Drawable {
  protected image;
  protected images!: Images;
  protected domNode!: ImageNode;
  protected source = new Vector();
  protected flipped = false;
  protected scale = 1;

  constructor({
    x,
    y,
    layer,
    image,
    scale = 1,
    width = image.width,
    height = image.height,
    flippable = false,
  }: ImageOptions) {
    super({ x, y, width, height, layer });

    this.scale = scale;
    this.image = getScaledImage(image, scale);

    if (flippable) {
      this.images = this.createImages();
    }
  }

  protected createDomNode(): ImageNode {
    return new ImageNode({ layer: this.layer as LayerDOM, drawable: this });
  }

  private createImages(): Images {
    return {
      straight: this.image,
      reversed: getReversedImage(this.image),
    };
  }

  public getSource(): Vector {
    return this.source;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public flip(): void {
    this.image = this.flipped ? this.images.straight : this.images.reversed;
    this.flipped = !this.flipped;

    this.domNode?.flip();
  }

  public draw(): void {
    this.layer.drawImage(this);
  }
}
