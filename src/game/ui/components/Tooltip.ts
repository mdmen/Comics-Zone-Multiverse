import { Node, type NodeContent } from './Node';

interface Options {
  content: NodeContent;
  tooltip: NodeContent;
  right?: boolean;
  classNames?: string[];
  tooltipId?: string;
}

export class Tooltip extends Node {
  private tooltipNode!: HTMLElement;

  constructor(options: Options) {
    super();

    this.node = this.create(options);
  }

  protected create({
    content,
    tooltip,
    classNames = [],
    right = false,
  }: Options): HTMLElement {
    const node = document.createElement('div');
    node.classList.add('tooltip', ...classNames);

    const nodeContent = document.createElement('div');
    nodeContent.classList.add('tooltip-content');
    nodeContent.append(content instanceof Node ? content.getNode() : content);
    node.append(nodeContent);

    const nodeTooltip = document.createElement('span');
    nodeTooltip.classList.add('tooltip-popup');
    nodeTooltip.setAttribute('role', 'tooltip');
    nodeTooltip.append(tooltip instanceof Node ? tooltip.getNode() : tooltip);

    node.append(nodeTooltip);

    if (right) {
      nodeTooltip.classList.add('right');
    }

    this.tooltipNode = nodeTooltip;

    return node;
  }

  setTooltip(content: NodeContent) {
    this.tooltipNode.innerHTML = '';

    this.tooltipNode.append(
      content instanceof Node ? content.getNode() : content
    );
  }
}
