import { Observable } from '../Observable';
import { AssetsEvents } from './AssetsEvents';

export abstract class Assets<T extends Record<string, unknown>> {
  private assets = {} as T;
  private readonly manifest;
  public readonly events = new Observable<AssetsEvents, T[keyof T]>();

  constructor(manifest: Record<keyof T, unknown>) {
    this.manifest = manifest;
  }

  public async load() {
    try {
      const keys: (keyof T)[] = Object.keys(this.manifest);
      let loaded = 0;

      await Promise.all(
        keys.map(async (key) => {
          const asset = (await this.loadAsset(
            this.manifest[key]
          )) as T[keyof T];

          this.assets[key] = asset;
          loaded++;

          if (keys.length === loaded) {
            this.events.notify(AssetsEvents.Progress, asset);
          } else {
            this.events.notify(AssetsEvents.Loaded);
          }
        })
      );
    } catch (error) {
      throw Error('Failed to load assets', { cause: error });
    }
  }

  public get<K extends keyof T>(key: K): T[K] {
    const asset = this.assets[key];

    if (!asset) {
      throw Error(`Asset "${String(key)}" is not loaded`);
    }

    return asset;
  }

  public clear(unsubscribe = true) {
    this.assets = {} as T;

    if (unsubscribe) {
      this.events.unsubscribeAll();
    }
  }

  protected abstract loadAsset(source: unknown): Promise<unknown>;
}
