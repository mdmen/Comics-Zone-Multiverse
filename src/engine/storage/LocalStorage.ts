import { Logger } from '../debug/Logger';
import { Settings } from '../Settings';

function getKey(key: string) {
  return `${Settings.getValue('storagePrefix')}${key}`;
}

interface LocalStorage {
  set: (key: string, value: unknown) => void;
  get: (key: string) => unknown;
}

export const LocalStorage: Readonly<LocalStorage> = {
  set(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      const itemKey = getKey(key);

      localStorage.setItem(itemKey, jsonValue);
    } catch (error) {
      Logger.error(error);
    }
  },

  get(key) {
    try {
      const itemKey = getKey(key);
      const value = localStorage.getItem(itemKey);

      return value ? JSON.parse(value) : value;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  },
};
