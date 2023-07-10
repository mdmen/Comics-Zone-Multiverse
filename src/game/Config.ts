import { Storage, type Audio, Settings } from '@/engine';
import { setTheme } from '@/helpers';

type Theme = 'system' | 'light' | 'dark';
type Sound = 'on' | 'off';
type Render = 'canvas' | 'dom';

interface ConfigValues {
  theme: Theme;
  sound: Sound;
  render: Render;
}

const defaults: ConfigValues = {
  theme: 'system',
  sound: 'on',
  render: Settings.get('renderEngine'),
} as const;

export class Config {
  private readonly storage;
  private readonly audio;

  constructor(audio: Audio) {
    this.storage = new Storage('config', { ...defaults });
    this.audio = audio;

    this.initTheme();
  }

  private initTheme(): void {
    const theme = this.getTheme();

    if (theme !== 'system') {
      setTheme(theme);
    }
  }

  public setTheme(value: Theme): void {
    this.storage.setValue('theme', value);

    if (value !== 'system') {
      setTheme(value);
    }
  }

  public getTheme(): Theme {
    return this.storage.getValue('theme');
  }

  public setSound(value: Sound): void {
    this.audio.setMuted(value === 'off');
    this.storage.setValue('sound', value);
  }

  public getSound(): Sound {
    return this.storage.getValue('sound');
  }

  public getRender(): Render {
    return this.storage.getValue('render');
  }

  public setRender(value: Render): void {
    Settings.set('renderEngine', value);
    this.storage.setValue('render', value);
  }
}
