import { Storage } from './Storage';

export class Config<Props extends string, Values extends unknown> {
  private static instance: unknown;
  private readonly initialValues;
  private readonly storageKey = 'config';

  private constructor(initialValues: Record<Props, Values>) {
    this.initialValues = initialValues;
  }

  private getConfig() {
    return (Storage.get(this.storageKey) || {}) as Record<Props, Values>;
  }

  public setValue(name: Props, value: Values): void {
    Storage.set(this.storageKey, {
      ...this.getConfig(),
      [name]: value,
    });
  }

  public getValue(name: Props): Values {
    return this.getConfig()[name] ?? this.initialValues[name];
  }

  public static getInstance<Props extends string, Values extends unknown>(
    initialValues: Record<Props, Values>
  ): Config<Props, Values> {
    if (!Config.instance) {
      Config.instance = new Config(initialValues);
    }

    return Config.instance as Config<Props, Values>;
  }
}
