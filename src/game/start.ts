import { getElement, onGlobalError } from './helpers';
import { Config } from './Config';
import {
  Audio,
  AudioAssets,
  ImageFontAssets,
  GameLoop,
  ImageAssets,
  Settings,
  createLayer,
} from '@/engine';
import { Button, Modal } from './ui/components';
import { Options } from './ui/Options';
import { SceneManager } from './scenes/SceneManager';
import { IntroScene, LoadingScene, Scenes } from './scenes';
import { Input } from './Input';
import { Events, GameEvents } from './Events';

Settings.set('storagePrefix', 'czg-');
Settings.set('eventsPrefix', 'CZG_');
Settings.set('gamepad', false);
Settings.set('fps', 60);
Settings.set('antialiasing', false);
Settings.set('width', 1012);
Settings.set('height', 756);

function createLayers(container: HTMLElement) {
  const baseLayerClassName = 'layer';
  const outerLayerClassName = 'layer-extra';

  return {
    bottom: createLayer({ container, className: baseLayerClassName }),
    middle: createLayer({
      container,
      className: baseLayerClassName,
      zIndex: 5,
    }),
    top: createLayer({ container, className: baseLayerClassName, zIndex: 10 }),
    outer: createLayer({
      container,
      className: outerLayerClassName,
      zIndex: 15,
    }),
  };
}

export function start() {
  const container = getElement('.container');

  const audio = new Audio();
  const config = new Config(audio);

  Settings.set('render', config.getRender());

  const sceneManager = new SceneManager({
    config,
    audio,
    layers: createLayers(container),
    fontAssets: new ImageFontAssets(),
    imageAssets: new ImageAssets(),
    audioAssets: new AudioAssets(),
    input: new Input(),
  });

  sceneManager.addScene(Scenes.LOADING, new LoadingScene(sceneManager));
  sceneManager.addScene(Scenes.INTRO, new IntroScene(sceneManager));

  sceneManager.setScene(Scenes.LOADING);

  const gameLoop = new GameLoop({
    update(step: number) {
      const scene = sceneManager.getScene();

      scene.update(step);
      scene.draw();
    },
  });

  const optionsModal = new Modal({
    container,
    heading: 'Game options',
    content: new Options(config),
    classNames: ['options-modal'],
  });

  const optionsButton = new Button({
    content: 'Options',
    classNames: ['options-button'],
    onClick: () => {
      optionsModal.show();
    },
  });

  container.append(optionsButton.getNode());

  onGlobalError(() => {
    const modal = new Modal({
      container,
      heading: '❗️ An error has occurred',
      content: 'Something went wrong. The game may work incorrectly',
    });

    modal.show();
  });

  Events.subscribe(GameEvents.GAME_RESET, () => {
    gameLoop.stop();

    sceneManager.getScene().destroy();

    const layers = sceneManager.getLayers();
    layers.bottom.destroy();
    layers.middle.destroy();
    layers.top.destroy();
    layers.outer.destroy();

    container.innerHTML = '';

    sceneManager.setLayers(createLayers(container));
    sceneManager.setScene(Scenes.LOADING);

    gameLoop.start();
  });

  gameLoop.start();
}
