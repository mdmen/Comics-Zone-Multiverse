import type { Shape } from '../Shape';
import { HTMLNode } from './HTMLNode';

export abstract class HTMLShapeNode<T extends Shape> extends HTMLNode<T> {
  protected color = '';
  protected borderColor = '';
  protected borderWidth = 0;

  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('shape-node');

    this.syncFillColor();
    this.syncBorderColor();
    this.syncBorderWidth();
  }

  public syncFillColor() {
    this.color = this.drawable.color;

    this.element.style.setProperty('--node-bg-color', this.color);
  }

  public syncBorderColor() {
    this.color = this.drawable.borderColor;

    this.element.style.setProperty('--node-border-color', this.color);
  }

  public syncBorderWidth() {
    this.borderWidth = this.drawable.borderWidth;

    this.element.style.setProperty(
      '--node-border-width',
      `${this.borderWidth | 0}px`
    );
  }

  public update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.color !== this.drawable.color) {
      this.syncFillColor();
    }

    if (this.borderColor !== this.drawable.borderColor) {
      this.syncBorderColor();
    }

    if (this.borderWidth !== this.drawable.borderWidth) {
      this.syncBorderWidth();
    }
  }
}
