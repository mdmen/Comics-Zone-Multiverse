import { Logger } from '../Logger';
import type { Storage } from './Storage';

export class LocalStorage implements Storage {
  private static instance: LocalStorage;
  private readonly logger = Logger.getInstance();

  private constructor() {}

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }

    return LocalStorage.instance;
  }

  public set(key: string, value: unknown) {
    try {
      const jsonValue = JSON.stringify(value);

      localStorage.setItem(key, jsonValue);
    } catch (error) {
      this.logger.error(error);
    }
  }

  public get(key: string) {
    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : value;
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
