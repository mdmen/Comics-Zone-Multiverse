export const isChrome = ((): (() => boolean) => {
  const value = navigator.userAgent.indexOf('Chrome') > -1;

  return function () {
    return value;
  };
})();

export const isSafari = ((): (() => boolean) => {
  const value = navigator.userAgent.indexOf('Safari') > -1 && !isChrome();

  return function () {
    return value;
  };
})();
