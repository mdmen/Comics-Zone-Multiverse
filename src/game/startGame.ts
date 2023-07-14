import { getAppContainer } from '@/helpers';
import { UISettings } from './ui/UISettings';
import { Config } from './Config';
import {
  Audio,
  FontAssets,
  GameLoop,
  SpriteText,
  createLayer,
  onGlobalError,
} from '@/engine';
import { Modal } from './ui/components';
import { fonts } from '@/constants';

export async function startGame(): Promise<void> {
  const container = getAppContainer();
  const audio = new Audio();
  const config = new Config(audio);
  const fontAssets = new FontAssets();
  const spriteFonts = await fontAssets.load(fonts);
  const layer = createLayer({ container });

  SpriteText.setup({
    layer,
    font: spriteFonts.basic,
    prepare: (str) => str.toLocaleUpperCase(),
  });
  const text = new SpriteText({ text: 'Hello guys! Common...' });

  function update(step: number) {
    text.update(step);
  }

  function draw() {
    text.draw();
  }

  const gameLoop = new GameLoop({ update, draw });

  new UISettings({ container, config });

  onGlobalError(() => {
    const modal = new Modal({
      container,
      heading: '❗️ Error has been occurred',
      content: 'Something went wrong. The game may work incorrectly',
    });

    modal.show();
  });

  gameLoop.start();
}
