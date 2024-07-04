import { Image } from '../Image';
import { HTMLNode } from './HTMLNode';

export class HTMLImageNode extends HTMLNode {
  protected declare readonly drawable: Image;

  constructor(drawable: Image) {
    super(drawable);

    this.element.classList.add('image-node');

    this.syncFlipped();

    const { src, clientWidth, clientHeight } = drawable.image;
    this.element.style.setProperty('--node-bg-image', `url(${src})`);
    this.element.style.setProperty('--node-width', `${clientWidth}px`);
    this.element.style.setProperty('--node-height', `${clientHeight}px`);
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

    if (!this.visible || this.opacity === 0) return;

    this.flipped !== this.drawable.flipped && this.syncFlipped();
  }
}
