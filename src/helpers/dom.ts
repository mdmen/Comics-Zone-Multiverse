import { containerID } from '@/constants/app';

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
  const container = document.getElementById(containerID);

  if (!container) throw Error(`#${containerID} not found`);

  return container;
}
