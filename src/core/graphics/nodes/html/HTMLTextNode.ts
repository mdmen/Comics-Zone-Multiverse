import { Text } from '../../Text';
import { HTMLNode } from './HTMLNode';

export class HTMLTextNode extends HTMLNode {
  protected declare readonly drawable: Text;
  protected text = '';
  protected fontSize = 16;
  protected color = 'black';
  protected shadowColor = '';
  protected maxWidth = 0;
  protected centered = false;

  constructor(drawable: Text) {
    super(drawable);

    this.element.classList.add('text-node');

    this.element.style.setProperty(
      '--node-font-family',
      `url(${drawable.fontFamily})`
    );

    this.syncText();
    this.syncFontSize();
  }

  public syncText() {
    this.text = this.drawable.text;

    this.element.textContent = this.text;
  }

  public syncFontSize() {
    this.fontSize = this.drawable.fontSize;

    this.element.style.setProperty('--node-font-size', `${this.fontSize}`);
  }

  public update() {
    super.update();

    if (!this.visible || this.opacity === 0) return;

    this.text !== this.drawable.text && this.syncText();
    this.fontSize !== this.drawable.fontSize && this.syncFontSize();
  }
}
