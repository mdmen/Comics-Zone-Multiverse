import { appContainerID } from '../constants/app';

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

export function setDocumentMeta(name: string, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`
  );

  if (meta) {
    meta.content = content;
    return;
  }

  meta = document.createElement('meta');
  meta.name = name;
  meta.content = content;

  document.head.appendChild(meta);
}

export function getAppContainer(): HTMLElement {
  const container = document.getElementById(appContainerID);

  if (!container) throw Error(`#${appContainerID} not found`);

  return container;
}
