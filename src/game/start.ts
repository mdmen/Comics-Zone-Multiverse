import { getAppContainer } from './helpers';
import { UISettings } from './ui/UISettings';
import { Config } from './Config';
import {
  Audio,
  AudioAssets,
  FontAssets,
  GameLoop,
  ImageAssets,
  createLayer,
  onGlobalError,
} from '@/engine';
import { Modal } from './ui/components';
import { Manager, Scenes } from './Manager';
import { Input } from './Input';

export async function start(): Promise<void> {
  const container = getAppContainer();
  const audio = new Audio();
  const config = new Config(audio);
  const fontAssets = new FontAssets();
  const imageAssets = new ImageAssets();
  const audioAssets = new AudioAssets();
  const input = new Input();

  const layers = {
    bottom: createLayer({ container }),
    middle: createLayer({ container }),
    top: createLayer({ container }),
  };
  layers.bottom.setStyle('zIndex', '1');
  layers.middle.setStyle('zIndex', '5');
  layers.top.setStyle('zIndex', '10');

  const manager = new Manager({
    config,
    audio,
    layers,
    fontAssets,
    imageAssets,
    audioAssets,
    input,
  });
  manager.setState(Scenes.LOADING);

  const gameLoop = new GameLoop({
    update(step: number) {
      const scene = manager.getState();

      scene.update(step);
      scene.draw();
    },
  });

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
