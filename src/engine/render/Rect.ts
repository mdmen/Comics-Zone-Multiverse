import { Drawable, type DrawableOptions } from './Drawable';
import { type LayerDOM } from './layers/LayerDOM';
import { DrawableNode } from './nodes';

interface Options extends DrawableOptions {
  color?: string;
}

export class Rect extends Drawable {
  protected domNode!: DrawableNode;
  private color;

  constructor({ color = '#000', ...options }: Options) {
    super(options);

    this.color = color;
  }

  getColor(): string {
    return this.color;
  }

  protected createDomNode(): DrawableNode {
    return new DrawableNode({
      layer: this.layer as LayerDOM,
      drawable: this,
      bgColor: this.color,
    });
  }

  draw() {
    super.draw();

    this.layer.drawRect(this);
  }
}
