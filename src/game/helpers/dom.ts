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
