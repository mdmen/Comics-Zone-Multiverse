export function isPageActive(): boolean {
  return document.visibilityState === 'visible';
}

export function onPageInactive(callback: (event: Event) => void): void {
  window.addEventListener('beforeunload', callback);
  window.addEventListener('pagehide', callback);
  window.addEventListener('visibilitychange', (event) => {
    !isPageActive() && callback(event);
  });
}

export function onDOMReady(callback: (event: Event) => void): void {
  window.addEventListener('DOMContentLoaded', callback);
}

export function onGlobalError(callback: (error: ErrorEvent) => void): void {
  window.addEventListener('error', callback);
}
