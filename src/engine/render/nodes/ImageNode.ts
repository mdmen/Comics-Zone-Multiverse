import { type Image } from '../Image';
import { type SpriteText } from '../sprites';
import { DrawableNode, type DrawableNodeOptions } from './DrawableNode';

interface ImageNodeOptions extends DrawableNodeOptions {
  drawable: Image | SpriteText;
}

export class ImageNode extends DrawableNode {
  protected drawable!: Image;

  constructor({ layer, drawable }: ImageNodeOptions) {
    super({ layer, drawable });
  }

  public updateImage(): void {
    const { src } = this.drawable.getImage();
    this.node.style.backgroundImage = `url(${src})`;
  }

  public flip(): void {
    this.updateImage();
  }
}
