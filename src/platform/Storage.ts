import { Logger } from 'interfaces/Logger';
import { appPrefix } from 'constants/app';

function getKey(key: string) {
  return `${appPrefix}${key}`;
}

interface Storage {
  set: (key: string, value: unknown) => void;
  get: (key: string) => unknown;
}

export const Storage: Readonly<Storage> = {
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
