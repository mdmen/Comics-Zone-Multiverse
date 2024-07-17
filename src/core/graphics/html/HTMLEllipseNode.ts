import { Vector } from '../../geometry';
import type { Ellipse } from '../Ellipse';
import { HTMLShapeNode } from './HTMLShapeNode';

export class HTMLEllipseNode<T extends Ellipse> extends HTMLShapeNode<T> {
  protected readonly radius = new Vector();

  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('ellipse-node');

    this.syncRadiusX();
    this.syncRadiusY();
  }

  public syncRadiusX() {
    this.radius.setX(this.drawable.radius.x);

    this.element.style.setProperty(
      '--node-width',
      `${(this.radius.x * 2) | 0}px`
    );
  }

  public syncRadiusY() {
    this.radius.setY(this.drawable.radius.y);

    this.element.style.setProperty(
      '--node-height',
      `${(this.radius.y * 2) | 0}px`
    );
  }

  public update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.radius.x !== this.drawable.radius.x) {
      this.syncRadiusX();
    }

    if (this.radius.y !== this.drawable.radius.y) {
      this.syncRadiusY();
    }
  }
}
