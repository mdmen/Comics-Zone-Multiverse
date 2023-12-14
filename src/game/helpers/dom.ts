export function getElement(selector: string) {
  const element = document.querySelector(selector);

  if (!element) throw Error(`${selector} not found`);

  return element as HTMLElement;
}

export function setTheme(theme: 'dark' | 'light') {
  const html = document.documentElement;

  html.classList.remove('dark', 'light');
  html.classList.add(theme);
}

export function isSystemDarkTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function createHiddenLabel(content: HTMLElement | string) {
  const label = document.createElement('span');

  label.classList.add('visually-hidden');
  label.append(content);

  return label;
}

export function onDOMReady(callback: (event: Event) => void) {
  window.addEventListener('DOMContentLoaded', callback, { once: true });
}

export function onGlobalError(callback: (error: ErrorEvent) => void) {
  window.addEventListener('error', callback);
}
