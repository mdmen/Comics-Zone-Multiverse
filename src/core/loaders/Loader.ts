import { Observable } from '../Observable';

export class Loader<
  Load extends (source: Source) => Promise<Asset>,
  Asset = Awaited<ReturnType<Load>>,
  Source = Parameters<Load>[0]
> {
  private readonly assets = new Map<string, Asset>();
  public readonly progressEvent = new Observable<Asset>();
  public readonly loadedEvent = new Observable<Asset>();

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
          let asset = this.assets.get(key);

          if (!asset) {
            asset = await this.load(this.manifest[key]);
            this.assets.set(key, asset);
          }

          loaded++;

          if (loaded === keys.length) {
            this.loadedEvent.notify(asset);
          } else {
            this.progressEvent.notify(asset);
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
      throw Error(
        `Unable to retrieve an asset. ${key} not ` +
          (this.manifest[key] ? 'loaded' : 'found')
      );
    }

    return asset;
  }

  public delete(...keys: string[]) {
    const notFound = keys.filter((key) => !this.manifest[key]);
    if (notFound.length) {
      throw Error(`Unable to delete assets. "${notFound}" not found`);
    }

    keys.forEach((key) => {
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
