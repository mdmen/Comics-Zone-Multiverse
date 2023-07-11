import { createHiddenLabel } from '@/helpers';
import { Node } from './Node';

type State = 'on' | 'off';

interface Options {
  onToggle(toggler: Toggler): void;
  defaultState: State;
  activeContent: Node | HTMLElement | string;
  inactiveContent: Node | HTMLElement | string;
  label?: string;
  classNames?: string[];
}

export class Toggler extends Node {
  private state;
  private label;
  private readonly activeContent;
  private readonly inactiveContent;

  constructor({
    defaultState,
    activeContent,
    inactiveContent,
    label = '',
    classNames = [],
    onToggle,
  }: Options) {
    super();

    this.state = defaultState;
    this.activeContent = activeContent;
    this.inactiveContent = inactiveContent;
    this.label = label;

    this.node = this.create(classNames);
    this.setContent();
    this.setAria();
    this.bindEvents(onToggle);
  }

  protected create(classNames: string[]): HTMLButtonElement {
    const node = document.createElement('button');
    node.type = 'button';

    const classes = [...classNames];
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
    this.node.setAttribute('aria-pressed', value);
  }

  public setContent(): void {
    const node = this.isActive() ? this.activeContent : this.inactiveContent;
    super.setContent(node);

    if (this.label) {
      const label = createHiddenLabel(this.label);
      this.node.append(label);
    }
  }

  public isActive(): boolean {
    return this.state === 'on';
  }
}
