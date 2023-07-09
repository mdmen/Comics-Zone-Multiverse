export function isPageActive(): boolean {
  return document.visibilityState === 'hidden';
}

export function onPageInactive(callback: () => void): void {
  const func = () => {
    callback();
  };

  window.addEventListener('beforeunload', func);
  window.addEventListener('pagehide', func);
  document.onvisibilitychange = () => {
    isPageActive() && func();
  };
}

export function onDOMReady(callback: () => void): void {
  window.addEventListener('DOMContentLoaded', () => {
    callback();
  });
}

export function onGlobalError(callback: (error: ErrorEvent) => void): void {
  window.addEventListener('error', (event) => {
    callback(event);
  });
}
