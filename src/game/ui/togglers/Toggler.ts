type State = 'on' | 'off';

interface Options {
  onToggle(toggler: Toggler): void;
  defaultState: State;
  activeContent: string;
  inactiveContent: string;
  classNames?: string[];
}

export class Toggler {
  private state;
  private readonly activeContent;
  private readonly inactiveContent;
  private readonly node: HTMLButtonElement;

  constructor({
    defaultState,
    activeContent,
    inactiveContent,
    classNames,
    onToggle,
  }: Options) {
    this.state = defaultState;
    this.activeContent = activeContent;
    this.inactiveContent = inactiveContent;

    this.node = this.create(classNames);
    this.setContent();
    this.setAria();
    this.bindEvents(onToggle);
  }

  private create(classNames?: string[]): HTMLButtonElement {
    const node = document.createElement('button');

    node.type = 'button';
    node.classList.add('toggler', ...(classNames ? classNames : []));
    node.setAttribute('role', 'switch');

    return node;
  }

  private bindEvents(onToggle: (toggler: Toggler) => void): void {
    this.node.addEventListener('click', () => {
      this.toggleState();
      this.setAria();
      this.setContent();

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
    this.node.innerHTML = this.isActive()
      ? this.activeContent
      : this.inactiveContent;
  }

  public isActive(): boolean {
    return this.state === 'on';
  }

  public getNode(): HTMLButtonElement {
    return this.node;
  }
}
