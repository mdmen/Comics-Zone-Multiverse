import { getAppContainer } from '@/helpers';
import { UISettings } from './ui/UISettings';
import { Config } from './Config';
import { Audio } from '@/engine';

export function startGame(): void {
  const container = getAppContainer();
  const audio = new Audio();
  const config = new Config(audio);

  new UISettings({ container, config });
}
