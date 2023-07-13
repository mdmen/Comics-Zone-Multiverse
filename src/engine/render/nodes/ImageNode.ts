import { type Image } from '../Image';
import { DrawableNode, type DrawableNodeOptions } from './DrawableNode';

interface ImageNodeOptions extends DrawableNodeOptions {
  drawable: Image;
}

export class ImageNode extends DrawableNode {
  protected drawable!: Image;

  constructor({ layer, drawable }: ImageNodeOptions) {
    super({ layer, drawable });

    this.node = this.create();
  }

  protected create(): HTMLElement {
    const node = super.create();
    const { src } = this.drawable.getImage();

    node.style.backgroundImage = `url(${src})`;

    return node;
  }

  public flip(): void {
    const { src } = this.drawable.getImage();
    this.node.style.backgroundImage = `url(${src})`;
  }
}
