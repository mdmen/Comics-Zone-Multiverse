import { isDOMEngine } from '../../utils';
import { type Layer, type LayerOptions } from './Layer';
import { LayerCanvas } from './LayerCanvas';
import { LayerDOM } from './LayerDOM';

export function createLayer(options: LayerOptions): Layer {
  return isDOMEngine() ? new LayerDOM(options) : new LayerCanvas(options);
}
