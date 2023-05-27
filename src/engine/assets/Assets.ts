import { Logger } from '../common/Logger';

export abstract class Assets<Names extends string, Asset extends unknown> {
  protected readonly sources;
  private readonly count;
  private readonly assets;

  constructor(sources: Record<Names, unknown>) {
    this.sources = sources;
    this.count = Object.keys(sources).length;
    this.assets = {} as Record<Names, Asset>;
  }

  public async load(): Promise<void> {
    try {
      const names = Object.keys(this.sources) as Names[];

      await Promise.all(
        names.map(async (key) => {
          const source = this.sources[key];
          const asset = await this.loadAsset(source);

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

  protected abstract loadAsset(src: unknown): Promise<Asset>;
}
