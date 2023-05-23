import { Logger } from './Logger';

type Resources<Type> = Record<string, Type>;

export abstract class Assets<Asset extends unknown> {
  protected readonly sources;
  private assets: Resources<Asset> = {};

  constructor(sources: Record<string, unknown>) {
    this.sources = sources;
  }

  private getTotalCount() {
    return Object.keys(this.sources).length;
  }

  public async load(): Promise<void> {
    try {
      const names = Object.keys(this.sources);

      await Promise.all(
        names.map(async (key) => {
          const asset = await this.loadResource(this.sources[key]);

          this.assets[key] = asset;

          return asset;
        })
      );
    } catch (error) {
      Logger.error(error);
    }
  }

  public get(): Resources<Asset> {
    return this.assets;
  }

  protected abstract loadResource(src: unknown): Promise<Asset>;
}
