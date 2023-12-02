import { type Picture } from '../Picture';
import { type SpriteText } from '../sprites';
import { DrawableNode, type DrawableNodeOptions } from './DrawableNode';

interface ImageNodeOptions extends DrawableNodeOptions {
  drawable: Picture | SpriteText;
}

export class ImageNode extends DrawableNode {
  protected drawable!: Picture;

  constructor({ layer, drawable }: ImageNodeOptions) {
    super({ layer, drawable });
  }

  updateImage() {
    const { src } = this.drawable.getImage();
    this.node.style.backgroundImage = `url(${src})`;
  }

  flip() {
    this.updateImage();
  }
}
