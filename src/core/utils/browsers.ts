export function isChrome() {
  return navigator.userAgent.indexOf('Chrome') > -1;
}

export function isSafari() {
  return navigator.userAgent.indexOf('Safari') > -1 && !isChrome();
}

export function isWebGLSupported() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext && canvas.getContext('webgl');

  return context instanceof WebGLRenderingContext;
}
