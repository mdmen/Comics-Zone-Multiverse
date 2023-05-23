import { Logger } from './Logger';

export abstract class Assets<Names extends string, Asset extends unknown> {
  protected readonly sources;
  private assets;

  constructor(sources: Record<Names, unknown>) {
    this.sources = sources;
    this.assets = {} as Record<Names, Asset>;
  }

  private getTotalCount() {
    return Object.keys(this.sources).length;
  }

  public async load(): Promise<void> {
    try {
      const names = Object.keys(this.sources) as Names[];

      await Promise.all(
        names.map(async (key) => {
          const source = this.sources[key];
          const asset = await this.loadResource(source);

          this.assets[key] = asset;
        })
      );
    } catch (error) {
      Logger.error(error);
    }
  }

  public get(): Record<Names, Asset> {
    return this.assets;
  }

  protected abstract loadResource(src: unknown): Promise<Asset>;
}
