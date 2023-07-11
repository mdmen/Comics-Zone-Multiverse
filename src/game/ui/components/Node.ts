export type NodeContent = Node | HTMLElement | string;

export abstract class Node {
  protected node!: HTMLElement;

  protected abstract create(...args: unknown[]): HTMLElement;

  public getNode(): HTMLElement {
    return this.node;
  }

  public setContent(content: NodeContent): void {
    const node = content instanceof Node ? content.getNode() : content;

    this.node.innerHTML = '';
    this.node.append(node);
  }
}
