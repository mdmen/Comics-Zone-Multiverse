export function isPageActive() {
  return document.visibilityState === 'visible';
}

export function onPageInactive(callback: (event: Event) => void) {
  window.addEventListener('beforeunload', callback);
  window.addEventListener('pagehide', callback);
  window.addEventListener('visibilitychange', (event) => {
    !isPageActive() && callback(event);
  });
}
