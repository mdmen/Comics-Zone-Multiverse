interface Toggler {
  defaultState: 'on' | 'off';
  onContent: Node;
  offContent: Node;
  onToggle(): void;
}

interface Options {
  container: HTMLElement;
  items: Toggler[];
}

export class Togglers {
  private items;
  private container;

  constructor({ container, items }: Options) {
    this.container = container;
    this.items = items;

    this.mount();
  }

  private create(): HTMLElement {
    const wrapper = document.createElement('div');

    wrapper.classList.add('togglers');

    this.items.map((item) => {
      const toggler = this.createToggler(item);
      wrapper.append(toggler);
    });

    return wrapper;
  }

  private mount(): void {
    const togglers = this.create();
    this.container.append(togglers);
  }

  private createToggler(item: Toggler): HTMLElement {
    const toggler = document.createElement('button');

    toggler.type = 'button';

    return toggler;
  }
}
