import type { RectEntity } from '../../entities';
import { Size } from '../../geometry';
import type { DrawableShape } from '../DrawableShape';
import { HTMLShapeNode } from './HTMLShapeNode';

export class HTMLRectNode<
  T extends RectEntity & { drawable: DrawableShape }
> extends HTMLShapeNode<T> {
  private readonly size = new Size();

  constructor(entity: T) {
    super(entity);

    this.element.classList.add('rect-node');

    this.syncWidth();
    this.syncHeight();
  }

  public syncWidth() {
    const size = this.entity.size;

    this.size.setWidth(size.width);
    this.element.style.setProperty('--node-width', `${size.width | 0}px`);
  }

  public syncHeight() {
    const size = this.entity.size;

    this.size.setHeight(size.height);
    this.element.style.setProperty('--node-height', `${size.height | 0}px`);
  }

  public override update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.size.width !== this.entity.size.width) {
      this.syncWidth();
    }

    if (this.size.height !== this.size.height) {
      this.syncHeight();
    }
  }
}
