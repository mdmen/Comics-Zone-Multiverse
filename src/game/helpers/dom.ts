function getElement(selector: string): HTMLElement {
  const element = document.querySelector(selector);

  if (!element) throw Error(`${selector} not found`);

  return element as HTMLElement;
}

export function getAppContainer(): HTMLElement {
  return getElement('.container');
}

export function setTheme(theme: 'dark' | 'light') {
  const html = document.documentElement;

  html.classList.remove('dark', 'light');
  html.classList.add(theme);
}

export function createHiddenLabel(content: HTMLElement | string): HTMLElement {
  const label = document.createElement('span');

  label.classList.add('visually-hidden');
  label.append(content);

  return label;
}

export function onDOMReady(callback: (event: Event) => void) {
  window.addEventListener('DOMContentLoaded', callback);
}

export function onGlobalError(callback: (error: ErrorEvent) => void) {
  window.addEventListener('error', callback);
}
