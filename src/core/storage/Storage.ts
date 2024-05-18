import { onPageInactive } from '../utils';
import { LocalStorage } from './LocalStorage';

export class Storage<Values extends Record<string, unknown>> {
  private static readonly storages: string[] = [];
  private readonly initialValues;
  private readonly memory;

  constructor(storageKey: string, initialValues: Values) {
    if (Storage.storages.includes(storageKey)) {
      throw Error(`Storage "${storageKey}" already exists`);
    }

    Storage.storages.push(storageKey);

    this.initialValues = { ...initialValues };
    this.memory = (LocalStorage.get(storageKey) || {}) as Values;

    onPageInactive(() => {
      LocalStorage.set(storageKey, this.memory);
    });
  }

  setValue<Key extends keyof Values>(name: Key, value: Values[Key]) {
    this.memory[name] = value;
  }

  getValue<Key extends keyof Values>(name: Key) {
    return this.memory[name] ?? this.initialValues[name];
  }
}
