import { Node, type NodeContent } from './Node';

interface Options {
  content: NodeContent;
  tooltip: NodeContent;
  opened?: boolean;
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
    opened = false,
    right = false,
  }: Options): HTMLElement {
    const node = document.createElement('div');
    node.classList.add('tooltip', ...classNames);

    const nodeContent = document.createElement('div');
    nodeContent.classList.add('tooltip-content');
    nodeContent.append(content instanceof Node ? content.getNode() : content);
    node.append(nodeContent);

    const nodeTooltip = document.createElement('span');
    nodeTooltip.classList.add('tooltip-popup', opened ? 'visible' : '');
    nodeTooltip.setAttribute('role', 'tooltip');
    nodeTooltip.append(tooltip instanceof Node ? tooltip.getNode() : tooltip);

    if (opened) {
      const close = () => {
        nodeTooltip.classList.remove('visible');
      };

      window.addEventListener('click', close, { once: true });
      window.addEventListener('keydown', close, { once: true });
    }

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
