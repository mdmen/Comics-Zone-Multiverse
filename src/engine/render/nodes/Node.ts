type AllowedProps =
  | 'zIndex'
  | 'position'
  | 'width'
  | 'height'
  | 'transform'
  | 'backgroundColor';
type Styles = Pick<CSSStyleDeclaration, AllowedProps>;

export abstract class Node {
  protected node!: HTMLElement;

  public setStyle<T extends keyof Styles>(name: T, value: Styles[T]): void {
    this.node.style[name] = value;
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public show(): void {
    this.node.hidden = false;
  }

  public hide(): void {
    this.node.hidden = true;
  }

  public destroy(): void {
    this.node.remove();
  }
}
