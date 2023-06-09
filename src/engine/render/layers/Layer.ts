import { CanvasLayer } from './CanvasLayer';
import { DOMLayer } from './DOMLayer';
import { Settings } from '../../Settings';

function getBaseLayer(): typeof CanvasLayer | typeof DOMLayer {
  return Settings.getValue('renderEngine') === 'canvas'
    ? CanvasLayer
    : DOMLayer;
}

export class Layer extends getBaseLayer() {}
