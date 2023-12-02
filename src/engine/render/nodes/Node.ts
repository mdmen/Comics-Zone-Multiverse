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

  setStyle<T extends keyof Styles>(name: T, value: Styles[T]) {
    this.node.style[name] = value;
  }

  getNode(): HTMLElement {
    return this.node;
  }

  show() {
    this.node.hidden = false;
  }

  hide() {
    this.node.hidden = true;
  }

  destroy() {
    this.node.remove();
  }
}
