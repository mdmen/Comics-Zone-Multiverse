import type { ImageEntity } from '../../entities';
import type { DrawableImage } from '../DrawableImage';
import { HTMLNode } from './HTMLNode';

export class HTMLImageNode<
  T extends ImageEntity & { drawable: DrawableImage }
> extends HTMLNode<T> {
  constructor(entity: T) {
    super(entity);

    this.element.classList.add('image-node');

    this.syncFlipped();

    this.element.style.setProperty(
      '--node-bg-image',
      `url(${this.entity.drawable.image.src})`
    );
    this.element.style.setProperty(
      '--node-width',
      `${Math.floor(entity.size.width)}px`
    );
    this.element.style.setProperty(
      '--node-height',
      `${Math.floor(entity.size.height)}px`
    );
  }

  public syncFlipped() {
    this.flipped = this.entity.drawable.flipped;

    this.element.style.setProperty(
      '--node-scale-x',
      `${this.flipped ? -this.scale : this.scale}`
    );
  }

  public override update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.flipped !== this.entity.drawable.flipped) {
      this.syncFlipped();
    }
  }
}
