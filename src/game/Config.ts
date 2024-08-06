import { GameStorage, type GameAudio, Settings } from '@/core';
import { setTheme } from '@/game/helpers';
import { Events, GameEvents } from './Events';

type Theme = 'system' | 'light' | 'dark';
type Sound = 'on' | 'off';
type Render = 'canvas' | 'dom' | 'webgl';

interface ConfigValues {
  theme: Theme;
  sound: Sound;
  music: boolean;
  sfxSounds: boolean;
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

  constructor(audio: GameAudio) {
    this.storage = new GameStorage('config', { ...defaults });
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
    this.storage.set('theme', value);

    if (value !== 'system') {
      setTheme(value);
    }
  }

  getTheme(): Theme {
    return this.storage.get('theme');
  }

  setSound(value: Sound) {
    this.audio.setMuted(value === 'off');
    this.storage.set('sound', value);
  }

  getSound(): Sound {
    return this.storage.get('sound');
  }

  getRender(): Render {
    return this.storage.get('render');
  }

  setRender(value: Render) {
    Settings.set('render', value);
    this.storage.set('render', value);

    Events.emit(GameEvents.GAME_RESET);
  }
}
