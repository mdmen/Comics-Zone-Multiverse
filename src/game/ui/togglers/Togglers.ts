import { type Toggler } from './Toggler';

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

    this.items.map((toggler) => {
      const node = toggler.getNode();

      node.classList.add('togglers-item');

      wrapper.append(node);
    });

    return wrapper;
  }

  private mount(): void {
    const togglers = this.create();
    this.container.append(togglers);
  }
}
