import { Settings } from '../../Settings';
import { type Sprite, type SpriteOptions } from './Sprite';
import { SpriteCanvas } from './SpriteCanvas';
import { SpriteDOM } from './SpriteDOM';

export function createSprite(options: SpriteOptions): Sprite {
  return Settings.get('renderEngine') === 'canvas'
    ? new SpriteCanvas(options)
    : new SpriteDOM(options);
}
