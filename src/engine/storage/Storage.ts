import { LocalStorage } from './LocalStorage';

export class Storage<Values extends unknown> {
  private static readonly storages: string[] = [];
  private readonly initialValues;
  private readonly storageKey;

  constructor(storageKey: string, initialValues: Values) {
    this.initialValues = initialValues;
    this.storageKey = storageKey;

    if (Storage.isExists(storageKey)) {
      throw Error(`Storage with key ${storageKey} already exists`);
    }

    Storage.storages.push(storageKey);
  }

  private static isExists(storageKey: string): boolean {
    return Storage.storages.includes(storageKey);
  }

  private getValues() {
    return (LocalStorage.get(this.storageKey) || {}) as Values;
  }

  public setValue<Key extends keyof Values>(
    name: Key,
    value: Values[Key]
  ): void {
    LocalStorage.set(this.storageKey, {
      ...(this.getValues() as Record<string, unknown>),
      [name]: value,
    });
  }

  public getValue<Key extends keyof Values>(name: Key): Values[Key] {
    return this.getValues()[name] ?? this.initialValues[name];
  }
}
