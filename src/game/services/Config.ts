import { Config as EngineConfig } from '@/engine';

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
  private readonly config;

  constructor() {
    this.config = EngineConfig.getInstance(defaults);
  }

  public setTheme(value: Theme): void {
    this.config.setValue('theme', value);
  }

  public getTheme(): Theme {
    return this.config.getValue('theme') as Theme;
  }

  public setSound(value: Sound): void {
    this.config.setValue('sound', value);
  }

  public getSound(): Sound {
    return this.config.getValue('sound') as Sound;
  }
}
