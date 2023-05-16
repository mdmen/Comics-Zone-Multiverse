import { Storage } from '../platform/Storage';

type Theme = 'system' | 'light' | 'dark';
type Sound = 'on' | 'off';

export interface ConfigValues {
  theme?: Theme;
  sound?: Sound;
}

const defaults: Required<ConfigValues> = {
  theme: 'system',
  sound: 'on',
} as const;

function getConfig(): ConfigValues {
  return Storage.get('config') || {};
}

interface Config {
  setValue<T extends keyof ConfigValues>(name: T, value: ConfigValues[T]): void;
  getValue<T extends keyof ConfigValues>(name: T): ConfigValues[T];
}

export const Config: Readonly<Config> = {
  setValue(name, value) {
    Storage.set('config', {
      ...getConfig(),
      [name]: value,
    });
  },

  getValue(name) {
    return getConfig()[name] ?? defaults[name];
  },
};
