import { Storage } from '@/engine';

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

  constructor() {
    this.storage = new Storage('config', defaults);
  }

  public setTheme(value: Theme): void {
    this.storage.setValue('theme', value);
  }

  public getTheme(): Theme {
    return this.storage.getValue('theme');
  }

  public setSound(value: Sound): void {
    this.storage.setValue('sound', value);
  }

  public getSound(): Sound {
    return this.storage.getValue('sound');
  }
}
