import { Settings } from '../../Settings';
import { type LayerOptions } from './Layer';
import { LayerCanvas } from './LayerCanvas';
import { LayerDOM } from './LayerDOM';

export function createLayer(options: LayerOptions) {
  return Settings.isDOMEngine()
    ? new LayerDOM(options)
    : new LayerCanvas(options);
}
