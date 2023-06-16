import { containerClass } from '@/constants';

export function onDOMReady(callback: () => unknown): void {
  window.addEventListener('DOMContentLoaded', () => {
    callback();
  });
}

export function onGlobalError(callback: (error: ErrorEvent) => unknown): void {
  window.addEventListener('error', (event) => {
    callback(event);
  });
}

export function getAppContainer(): HTMLElement {
  const container = document.getElementById(containerClass);

  if (!container) throw Error(`.${containerClass} not found`);

  return container;
}
