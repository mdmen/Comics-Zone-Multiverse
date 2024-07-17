import { Size } from '../../geometry';
import type { Rect } from '../Rect';
import { HTMLShapeNode } from './HTMLShapeNode';

export class HTMLRectNode<T extends Rect> extends HTMLShapeNode<T> {
  protected readonly size = new Size();

  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('rect-node');

    this.syncWidth();
    this.syncHeight();
  }

  public syncWidth() {
    const size = this.drawable.size;

    this.size.setWidth(size.width);
    this.element.style.setProperty('--node-width', `${size.width | 0}px`);
  }

  public syncHeight() {
    const size = this.drawable.size;

    this.size.setHeight(size.height);
    this.element.style.setProperty('--node-height', `${size.height | 0}px`);
  }

  public update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.size.width !== this.drawable.size.width) {
      this.syncWidth();
    }

    if (this.size.height !== this.drawable.size.height) {
      this.syncHeight();
    }
  }
}
