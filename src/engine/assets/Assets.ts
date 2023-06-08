import { Logger } from '../debug/Logger';
import { isEmpty } from '@/helpers/utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets {
  private readonly sources;
  private count;
  protected assets;

  constructor(sources: Sources) {
    this.sources = sources;
    this.count = Object.keys(sources).length;
    this.assets = {} as Resources;
  }

  private async load(): Promise<void> {
    try {
      const names = Object.keys(this.sources);

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

  private isEmpty(): boolean {
    const keys = Object.keys(this.assets);
    return isEmpty(keys);
  }

  protected async retrieve(): Promise<unknown> {
    if (this.isEmpty()) {
      await this.load();
    }

    return this.assets;
  }

  protected abstract loadAsset(src: unknown): Promise<unknown>;

  public clear(): void {
    this.assets = {};
    this.count = 0;
  }
}
