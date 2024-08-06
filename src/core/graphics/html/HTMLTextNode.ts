import type { Text } from '../Text';
import { HTMLNode } from './HTMLNode';

export class HTMLTextNode<T extends Text> extends HTMLNode<T> {
  protected text = '';
  protected fontSize = 16;
  protected color = 'black';
  protected shadowColor = '';
  protected maxWidth = 0;
  protected centered = false;

  constructor(drawable: T) {
    super(drawable);

    this.element.classList.add('text-node');

    this.element.style.setProperty(
      '--node-font-family',
      `url(${drawable.fontFamily})`
    );

    this.syncText();
    this.syncColor();
    this.syncFontSize();

    if (this.drawable.shadowColor) {
      this.element.classList.add('g-text-node-shadowed');

      this.element.style.setProperty(
        '--node-text-shadow-offset-x',
        `${this.drawable.shadowOffset.x | 0}px`
      );
      this.element.style.setProperty(
        '--node-text-shadow-offset-y',
        `${this.drawable.shadowOffset.y | 0}px`
      );
      this.element.style.setProperty(
        '--node-text-shadow-blur',
        `${this.drawable.shadowBlur | 0}px`
      );

      this.syncShadowColor();
    }
  }

  public syncText() {
    this.text = this.drawable.text;

    this.element.textContent = this.text;
  }

  public syncFontSize() {
    this.fontSize = this.drawable.fontSize;

    this.element.style.setProperty('--node-font-size', `${this.fontSize}`);
  }

  public syncColor() {
    this.color = this.drawable.color;

    this.element.style.setProperty('--node-text-color', `${this.color}`);
  }

  public syncShadowColor() {
    this.shadowColor = this.drawable.shadowColor;

    this.element.style.setProperty(
      '--node-text-shadow-color',
      `${this.shadowColor}`
    );
  }

  public override update() {
    super.update();

    if (!this.shouldUpdate) return;

    if (this.text !== this.drawable.text) {
      this.syncText();
    }

    if (this.color !== this.drawable.color) {
      this.syncColor();
    }

    if (this.shadowColor !== this.drawable.shadowColor) {
      this.syncShadowColor();
    }
  }
}
