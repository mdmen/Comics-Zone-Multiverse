import { createHiddenLabel } from '@/helpers';
import { Node } from './Node';

interface Options {
  onClick(): void;
  content: Node | HTMLElement | string;
  label?: string;
  classNames?: string[];
}

export class Button extends Node {
  private label;
  private content;

  constructor({ label = '', content, classNames = [], onClick }: Options) {
    super();

    this.content = content;
    this.label = label;

    this.node = this.create(classNames, onClick);
    this.setContent();
  }

  protected create(
    classNames: string[],
    onClick: () => void
  ): HTMLButtonElement {
    const node = document.createElement('button');
    node.type = 'button';

    const classes = [...classNames];
    node.classList.add('button', ...classes);

    node.addEventListener('click', onClick);

    return node;
  }

  public setContent(): void {
    super.setContent(this.content);

    if (this.label) {
      const label = createHiddenLabel(this.label);
      this.node.append(label);
    }
  }
}
