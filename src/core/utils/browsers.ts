export function isChrome() {
  return navigator.userAgent.indexOf('Chrome') > -1;
}

export function isSafari() {
  return navigator.userAgent.indexOf('Safari') > -1 && !isChrome();
}
