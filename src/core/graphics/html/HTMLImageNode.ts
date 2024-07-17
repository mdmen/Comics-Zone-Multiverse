import { Image } from '../Image';
import { HTMLNode } from './HTMLNode';

export class HTMLImageNode<T extends Image> extends HTMLNode<T> {
  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('image-node');

    this.syncFlipped();

    const { image, size } = drawable;
    this.element.style.setProperty('--node-bg-image', `url(${image.src})`);
    this.element.style.setProperty('--node-width', `${size.width}px`);
    this.element.style.setProperty('--node-height', `${size.height}px`);
  }

  public syncFlipped() {
    this.flipped = this.drawable.flipped;

    this.element.style.setProperty(
      '--node-scale-x',
      `${this.flipped ? -this.scale : this.scale}`
    );
  }

  public update() {
    super.update();

    if (!this.shouldUpdate) return;

    this.flipped !== this.drawable.flipped && this.syncFlipped();
  }
}
