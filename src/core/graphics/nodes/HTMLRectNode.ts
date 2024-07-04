import { Vector } from '../../geometry';
import type { Rect } from '../Rect';
import { HTMLNode } from './HTMLNode';

export class HTMLRectNode extends HTMLNode {
  protected declare readonly drawable: Rect;
  protected color = '';
  protected borderColor = '';
  protected borderWidth = 0;
  protected readonly size = new Vector();

  constructor(drawable: Rect) {
    super(drawable);

    this.element.classList.add('rect-node');

    this.syncFillColor();
    this.syncBorderColor();
    this.syncBorderWidth();
    this.syncSizeX();
    this.syncSizeY();
  }

  public syncFillColor() {
    this.color = this.drawable.color;

    this.element.style.setProperty('--node-bg-color', this.drawable.color);
  }

  public syncBorderColor() {
    this.color = this.drawable.borderColor;

    this.element.style.setProperty(
      '--node-border-color',
      this.drawable.borderColor
    );
  }

  public syncBorderWidth() {
    this.borderWidth = this.drawable.borderWidth;

    this.element.style.setProperty(
      '--node-border-width',
      `${this.drawable.borderWidth | 0}px`
    );
  }

  public syncSizeX() {
    const size = this.drawable.size;

    this.size.setX(size.x);
    this.element.style.setProperty('--node-width', `${size.x | 0}px`);
  }

  public syncSizeY() {
    const size = this.drawable.size;

    this.size.setY(size.y);
    this.element.style.setProperty('--node-height', `${size.y | 0}px`);
  }

  public update() {
    super.update();

    if (!this.visible || this.opacity === 0) return;

    this.color !== this.drawable.color && this.syncFillColor();
    this.borderColor !== this.drawable.borderColor && this.syncBorderColor();
    this.borderWidth !== this.drawable.borderWidth && this.syncBorderWidth();
    this.size.x !== this.drawable.size.x && this.syncSizeX();
    this.size.y !== this.drawable.size.y && this.syncSizeY();
  }
}
