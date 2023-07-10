export abstract class Node {
  protected node!: HTMLElement;

  protected abstract create(...args: unknown[]): HTMLElement;

  public getNode(): HTMLElement {
    return this.node;
  }
}
