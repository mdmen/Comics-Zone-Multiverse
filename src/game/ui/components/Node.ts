export type NodeType = Node | HTMLElement | string;
export type NodeContent = NodeType | NodeContent[];

export abstract class Node {
  protected node!: HTMLElement;

  protected abstract create(...args: unknown[]): HTMLElement;

  static extractNodeContent(content: NodeType) {
    return content instanceof Node ? content.getNode() : content;
  }

  static setContent(node: HTMLElement, content: NodeContent) {
    node.innerHTML = '';
    Node.addContent(node, content);
  }

  static addContent(node: HTMLElement, content: NodeContent) {
    if (!Array.isArray(content)) {
      const nodeContent = Node.extractNodeContent(content);
      node.append(nodeContent);
      return;
    }

    content.forEach((nodeContent) => {
      Node.addContent(node, nodeContent);
    });
  }

  addClassNames(...classNames: string[]) {
    this.node.classList.add(...classNames.filter(Boolean));
  }

  removeClassNames(...classNames: string[]) {
    this.node.classList.remove(...classNames.filter(Boolean));
  }

  getNode() {
    return this.node;
  }

  destroy() {
    this.node.remove();
    this.node = null as unknown as HTMLElement;
  }
}
