import { getAppContainer } from './helpers';
import { UISettings } from './ui/UISettings';
import { Config } from './Config';
import {
  Audio,
  AudioAssets,
  ImageFontAssets,
  GameLoop,
  ImageAssets,
  Factory,
  onGlobalError,
} from '@/engine';
import { Modal } from './ui/components';
import { Manager, Scenes } from './Manager';
import { Input } from './Input';

export async function start(): Promise<void> {
  const container = getAppContainer();
  const audio = new Audio();
  const config = new Config(audio);
  const fontAssets = new ImageFontAssets();
  const imageAssets = new ImageAssets();
  const audioAssets = new AudioAssets();
  const input = new Input();

  const layers = {
    bottom: Factory.createLayer({ container }),
    middle: Factory.createLayer({ container }),
    top: Factory.createLayer({ container }),
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
