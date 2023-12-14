import { Storage, type Audio, Settings } from '@/engine';
import { setTheme } from '@/game/helpers';
import { Events, GameEvents } from './Events';

type Theme = 'system' | 'light' | 'dark';
type Sound = 'on' | 'off';
type Render = 'canvas' | 'dom' | 'webgl';

interface ConfigValues {
  theme: Theme;
  sound: Sound;
  render: Render;
}

const defaults: ConfigValues = {
  theme: 'system',
  sound: 'off',
  render: 'canvas',
};

export class Config {
  private readonly storage;
  private readonly audio;

  constructor(audio: Audio) {
    this.storage = new Storage('config', { ...defaults });
    this.audio = audio;

    this.initTheme();
  }

  private initTheme() {
    const theme = this.getTheme();

    if (theme !== 'system') {
      setTheme(theme);
    }
  }

  setTheme(value: Theme) {
    this.storage.setValue('theme', value);

    if (value !== 'system') {
      setTheme(value);
    }
  }

  getTheme(): Theme {
    return this.storage.getValue('theme');
  }

  setSound(value: Sound) {
    this.audio.setMuted(value === 'off');
    this.storage.setValue('sound', value);
  }

  getSound(): Sound {
    return this.storage.getValue('sound');
  }

  getRender(): Render {
    return this.storage.getValue('render');
  }

  setRender(value: Render) {
    Settings.set('render', value);
    this.storage.setValue('render', value);

    Events.emit(GameEvents.GAME_RESET);
  }
}
