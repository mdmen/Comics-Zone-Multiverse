import { Node, type NodeContent } from './Node';

interface Options {
  onClick(): void;
  content: NodeContent;
  classNames?: string[];
}

export class Button extends Node {
  constructor({ content, classNames = [], onClick }: Options) {
    super();

    this.node = this.create(content, onClick);
    this.addClassNames(...classNames);
  }

  protected create(content: NodeContent, onClick: () => void) {
    const node = document.createElement('button');
    node.type = 'button';

    Node.addContent(node, content);
    node.classList.add('button');
    node.addEventListener('click', onClick);

    return node;
  }
}
