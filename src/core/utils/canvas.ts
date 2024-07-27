export function createCanvas(width: number, height: number, offscreen = false) {
  const canvasWith = Math.floor(width);
  const canvasHeight = Math.floor(height);

  if (offscreen) {
    return new OffscreenCanvas(canvasWith, canvasHeight);
  }

  const canvas = document.createElement('canvas');
  canvas.width = canvasWith;
  canvas.height = canvasHeight;

  return canvas;
}

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth;
  if (canvas.width !== width) {
    canvas.width = width;
  }

  const height = canvas.clientHeight;
  if (canvas.height !== height) {
    canvas.height = height;
  }
}
