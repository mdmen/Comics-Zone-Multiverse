import { LayerCanvas } from './LayerCanvas';
import { LayerDOM } from './LayerDOM';
import { Settings } from '../../Settings';

function getBaseLayer() {
  return Settings.getValue('renderEngine') === 'canvas'
    ? LayerCanvas
    : LayerDOM;
}

export class Layer extends getBaseLayer() {}
