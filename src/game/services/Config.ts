import { Storage, Audio } from '@/engine';

type Theme = 'system' | 'light' | 'dark';
type Sound = 'on' | 'off';

interface ConfigValues {
  theme: Theme;
  sound: Sound;
}

const defaults: ConfigValues = {
  theme: 'system',
  sound: 'on',
} as const;

export class Config {
  private readonly storage;
  private readonly audio;

  constructor() {
    this.storage = new Storage('config', defaults);
    this.audio = Audio.getInstance();
  }

  public setTheme(value: Theme): void {
    this.storage.setValue('theme', value);
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
}
