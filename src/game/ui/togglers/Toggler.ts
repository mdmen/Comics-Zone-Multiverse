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
  private activeContent;
  private inactiveContent;
  private node;

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
    this.node = document.createElement('button');

    this.init(classNames);
    this.bindEvents(onToggle);
  }

  private init(classNames?: string[]): void {
    this.node = document.createElement('button');

    this.node.type = 'button';
    this.node.classList.add('toggler', ...(classNames ? classNames : []));
    this.setContent();

    this.node.setAttribute('role', 'switch');
    this.setAria();
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
