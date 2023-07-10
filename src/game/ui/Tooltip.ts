import { Node } from './Node';

type Content = Node | HTMLElement | string;

interface Options {
  content: Content;
  tooltip: Content;
  right?: boolean;
}

export class Tooltip extends Node {
  private tooltipNode!: HTMLElement;

  constructor(options: Options) {
    super();

    this.node = this.create(options);
  }

  protected create({ content, tooltip, right = false }: Options): HTMLElement {
    const node = document.createElement('div');
    node.classList.add('tooltip');

    const nodeContent = document.createElement('div');
    nodeContent.classList.add('tooltip-content');
    nodeContent.append(content instanceof Node ? content.getNode() : content);
    node.append(nodeContent);

    const nodeTooltip = document.createElement('span');
    nodeTooltip.classList.add('tooltip-popup');
    nodeTooltip.append(tooltip instanceof Node ? tooltip.getNode() : tooltip);
    node.append(nodeTooltip);

    if (right) {
      nodeTooltip.classList.add('right');
    }

    this.tooltipNode = nodeTooltip;

    return node;
  }

  public setTooltip(content: Content): void {
    this.tooltipNode.innerHTML = '';

    this.tooltipNode.append(
      content instanceof Node ? content.getNode() : content
    );
  }

  public getNode(): HTMLElement {
    return this.node;
  }
}
