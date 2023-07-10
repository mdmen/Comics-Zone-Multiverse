import { Node } from './Node';

type State = 'on' | 'off';

interface Options {
  onToggle(toggler: Toggler): void;
  defaultState: State;
  activeContent: Node | HTMLElement | string;
  inactiveContent: Node | HTMLElement | string;
  classNames?: string[];
}

export class Toggler extends Node {
  private state;
  private readonly activeContent;
  private readonly inactiveContent;

  constructor({
    defaultState,
    activeContent,
    inactiveContent,
    classNames,
    onToggle,
  }: Options) {
    super();

    this.state = defaultState;
    this.activeContent = activeContent;
    this.inactiveContent = inactiveContent;

    this.node = this.create(classNames);
    this.setContent();
    this.setAria();
    this.bindEvents(onToggle);
  }

  protected create(classNames?: string[]): HTMLButtonElement {
    const node = document.createElement('button');

    node.type = 'button';
    node.setAttribute('role', 'switch');

    const classes = classNames ? classNames : [];
    this.isActive() && classes.push('active');
    node.classList.add('toggler', ...classes);

    return node;
  }

  private bindEvents(onToggle: (toggler: Toggler) => void): void {
    this.node.addEventListener('click', () => {
      this.toggleState();
      this.setAria();
      this.setContent();

      this.node.classList.toggle('active');

      onToggle(this);
    });
  }

  private toggleState(): void {
    this.state = this.isActive() ? 'off' : 'on';
  }

  private setAria(): void {
    const value = this.isActive().toString();
    this.node.setAttribute('aria-checked', value);
  }

  private setContent(): void {
    this.node.innerHTML = '';

    const node = this.isActive() ? this.activeContent : this.inactiveContent;
    this.node.append(node instanceof Node ? node.getNode() : node);
  }

  public isActive(): boolean {
    return this.state === 'on';
  }
}
