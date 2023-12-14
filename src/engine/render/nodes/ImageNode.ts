import { type Picture } from '../Picture';
import { type LayerDOM } from '../layers';
import { Node } from './Node';
import { type HTMLImage } from '../images';

export class ImageNode extends Node {
  protected drawable!: Picture;

  constructor(layer: LayerDOM, drawable: Picture) {
    super(layer, drawable);

    this.setImage();
    this.node.style.backgroundRepeat = 'no-repeat';
  }

  setImage() {
    const image = this.drawable.getImage() as HTMLImage;
    const { src } = image.getSource();

    this.node.style.backgroundImage = `url(${src})`;
  }

  flip() {
    this.setImage();
  }
}
