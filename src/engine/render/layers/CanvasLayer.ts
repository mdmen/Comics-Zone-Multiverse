import { canvasDefaultSmoothing } from '../../settings';
import { Layer, type LayerOptions } from './Layer';
import type { Canvas } from '../Canvas';

interface Options extends LayerOptions {
  transparent?: boolean;
  imageSmooth?: boolean;
}

export class CanvasLayer extends Layer {
  private canvas: Canvas;

  constructor(container: HTMLElement, options: Options = {}) {
    super(container, options);
  }
}
