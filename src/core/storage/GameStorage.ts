import type { Storage } from './Storage';
import { Logger } from '../Logger';

export class GameStorage<Values extends Record<string, unknown>> {
  private static readonly gameStorages = new Map<
    string,
    GameStorage<Record<string, unknown>>
  >();
  private readonly storage;
  private readonly logger;
  private readonly storageKey;
  private memory!: Values;

  constructor(storage: Storage, storageKey: string, defaults: Values) {
    if (GameStorage.gameStorages.has(storageKey)) {
      throw Error(`Storage "${storageKey}" already exists`);
    }

    this.storage = storage;
    this.storageKey = storageKey;
    this.logger = Logger.getInstance();

    GameStorage.gameStorages.set(storageKey, this);

    this.load(defaults);
  }

  static {
    window.addEventListener('pagehide', GameStorage.saveEverything);
    window.addEventListener('blur', GameStorage.saveEverything);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') {
        GameStorage.saveEverything();
      }
    });
  }

  private static saveEverything() {
    GameStorage.gameStorages.forEach((storage) => storage.save());
  }

  private load(defaults: Values) {
    this.memory = {
      ...defaults,
      ...(this.storage.get(this.storageKey) as Values),
    };
    this.logger.info(`Game storage loaded: ${this.storageKey}`);
  }

  private save() {
    this.storage.set(this.storageKey, this.memory);
    this.logger.info(`Game storage saved: ${this.storageKey}`);
  }

  public set<Key extends keyof Values>(name: Key, value: Values[Key]) {
    this.memory[name] = value;
  }

  public get<Key extends keyof Values>(name: Key) {
    return this.memory[name];
  }
}
