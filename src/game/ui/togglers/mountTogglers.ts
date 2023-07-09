import { Togglers } from './Togglers';
import { Toggler } from './Toggler';

interface Options {
  container: HTMLElement;
}

export function mountTogglers({ container }: Options): void {
  const soundToggler = new Toggler({
    defaultState: 'on',
    activeContent: '🔊',
    inactiveContent: '🔈',
    onToggle: () => {},
  });

  const themeToggler = new Toggler({
    defaultState: 'on',
    activeContent: '🌃',
    inactiveContent: '🌆',
    onToggle: () => {},
  });

  const renderToggler = new Toggler({
    defaultState: 'on',
    activeContent: '⚙️',
    inactiveContent: '⚙️',
    onToggle: () => {},
  });

  new Togglers({
    container,
    items: [soundToggler, themeToggler, renderToggler],
  });
}
