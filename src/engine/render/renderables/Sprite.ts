import { CanvasSprite } from './CanvasSprite';
import { DOMSprite } from './DOMSprite';
import { Settings } from '../../Settings';

function getBaseSprite(): typeof CanvasSprite | typeof DOMSprite {
  return Settings.getValue('renderEngine') === 'canvas'
    ? CanvasSprite
    : DOMSprite;
}

export class Sprite extends getBaseSprite() {}
