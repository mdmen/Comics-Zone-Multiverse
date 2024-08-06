import type { CircleEntity } from '../../entities';
import { Vector } from '../../geometry';
import type { DrawableShape } from '../DrawableShape';
import { HTMLShapeNode } from './HTMLShapeNode';

export class HTMLEllipseNode<
  T extends CircleEntity & { drawable: DrawableShape }
> extends HTMLShapeNode<T> {
  private readonly radius = new Vector();

  constructor(entity: T) {
    super(entity);

    this.element.classList.add('ellipse-node');

    this.syncRadiusX();
    this.syncRadiusY();
  }

  public syncRadiusX() {
    this.radius.x = this.entity.radius.x;

    this.element.style.setProperty(
      '--node-width',
      `${(this.radius.x * 2) | 0}px`
    );
  }

  public syncRadiusY() {
    this.radius.y = this.entity.radius.y;

    this.element.style.setProperty(
      '--node-height',
      `${(this.radius.y * 2) | 0}px`
    );
  }

  public update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.radius.x !== this.entity.radius.x) {
      this.syncRadiusX();
    }

    if (this.radius.y !== this.entity.radius.y) {
      this.syncRadiusY();
    }
  }
}
