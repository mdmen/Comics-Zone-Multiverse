import { Entity } from '../../entities';
import type { DrawableShape } from '../DrawableShape';
import { HTMLNode } from './HTMLNode';

export abstract class HTMLShapeNode<
  T extends Entity & { drawable: DrawableShape }
> extends HTMLNode<T> {
  private color = '';
  private borderWidth = 0;
  private borderColor = '';

  constructor(entity: T) {
    super(entity);

    this.element.classList.add('shape-node');

    this.syncFillColor();
    this.syncBorderColor();
    this.syncBorderWidth();
  }

  public syncFillColor() {
    this.color = this.entity.drawable.color;

    this.element.style.setProperty('--node-bg-color', this.color);
  }

  public syncBorderColor() {
    this.color = this.entity.drawable.borderColor;

    this.element.style.setProperty('--node-border-color', this.color);
  }

  public syncBorderWidth() {
    this.borderWidth = this.entity.drawable.borderWidth;

    this.element.style.setProperty(
      '--node-border-width',
      `${this.borderWidth | 0}px`
    );
  }

  public override update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.color !== this.entity.drawable.color) {
      this.syncFillColor();
    }

    if (this.borderColor !== this.entity.drawable.borderColor) {
      this.syncBorderColor();
    }

    if (this.borderWidth !== this.entity.drawable.borderWidth) {
      this.syncBorderWidth();
    }
  }
}
