import { SpriteCanvas } from './SpriteCanvas';
import { SpriteDOM } from './SpriteDOM';
import { Settings } from '../../Settings';

function getBaseSprite() {
  return Settings.getValue('renderEngine') === 'canvas'
    ? SpriteCanvas
    : SpriteDOM;
}

export class Sprite extends getBaseSprite() {}
