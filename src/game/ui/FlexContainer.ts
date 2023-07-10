import { Node } from './Node';

interface Options {
  items: Node[];
  classNames?: string[];
}

export class FlexContainer extends Node {
  private items;
  private readonly classNames;

  constructor({ items, classNames }: Options) {
    super();

    this.items = items;
    this.classNames = classNames;

    this.node = this.create();
  }

  protected create(): HTMLElement {
    const container = document.createElement('div');

    container.classList.add(
      'flex-container',
      ...(this.classNames ? this.classNames : [])
    );

    this.items.map((element) => {
      const node = element.getNode();

      node.classList.add('flex-container-item');

      container.append(node);
    });

    return container;
  }
}
