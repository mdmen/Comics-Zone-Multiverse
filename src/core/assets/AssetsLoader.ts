import { Observable } from '../Observable';

export class AssetsLoader<
  Source,
  Asset,
  Load extends (source: Source) => Promise<Asset>
> {
  private readonly assets = new Map<string, Asset>();
  public readonly progressEvent = new Observable<this>();
  public readonly loadedEvent = new Observable<this>();

  constructor(
    private readonly manifest: Record<string, Source>,
    private readonly load: Load
  ) {}

  public async loadAll() {
    try {
      const keys = Object.keys(this.manifest);
      let loaded = 0;

      await Promise.all(
        keys.map(async (key) => {
          const asset = await this.load(this.manifest[key]);

          this.assets.set(key, asset);
          loaded++;

          if (loaded === keys.length) {
            this.loadedEvent.notify(this);
          } else {
            this.progressEvent.notify(this);
          }
        })
      );
    } catch (error) {
      throw Error('Failed to load assets', { cause: error });
    }
  }

  public get(key: string) {
    const asset = this.assets.get(key);

    if (!asset) {
      throw Error(`Unable to retrieve "${key}" asset`);
    }

    return asset;
  }

  public delete(...keys: string[]) {
    keys.forEach((key) => {
      if (!this.assets.has(key)) {
        throw Error(`Unable to delete "${key}" asset`);
      }

      this.assets.delete(key);
    });
  }

  public clear(unsubscribe = true) {
    this.assets.clear();

    if (unsubscribe) {
      this.progressEvent.unsubscribeAll();
      this.loadedEvent.unsubscribeAll();
    }
  }
}
