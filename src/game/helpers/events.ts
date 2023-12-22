export function onDOMReady(callback: (event: Event) => void) {
  window.addEventListener('DOMContentLoaded', callback, { once: true });
}

export function onGlobalError(callback: (error: ErrorEvent) => void) {
  window.addEventListener('error', callback);
}

export function onPressOnce(callback: (event: Event) => void) {
  const cb = (event: Event) => {
    window.removeEventListener('keydown', cb);
    window.removeEventListener('touchstart', cb);

    callback(event);
  };

  window.addEventListener('keydown', cb);
  window.addEventListener('touchstart', cb);
}
