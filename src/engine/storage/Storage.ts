import { onPageInactive } from '../utils';
import { LocalStorage } from './LocalStorage';

export class Storage<Values extends Record<string, unknown>> {
  private static readonly storages: string[] = [];
  private readonly initialValues;
  private readonly storageKey;
  private readonly memory;

  constructor(storageKey: string, initialValues: Values) {
    if (Storage.storages.includes(storageKey)) {
      throw Error(`Storage with key ${storageKey} already exists`);
    }

    this.initialValues = initialValues;
    this.storageKey = storageKey;
    this.memory = (LocalStorage.get(this.storageKey) || {}) as Values;

    Storage.storages.push(storageKey);

    onPageInactive(() => {
      LocalStorage.set(this.storageKey, this.memory);
    });
  }

  public setValue<Key extends keyof Values>(
    name: Key,
    value: Values[Key]
  ): void {
    this.memory[name] = value;
  }

  public getValue<Key extends keyof Values>(name: Key): Values[Key] {
    return this.memory[name] ?? this.initialValues[name];
  }
}
