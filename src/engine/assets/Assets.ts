import { Logger } from '../debug/Logger';
import { isEmpty } from '@/helpers/utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets {
  private sources: Sources;
  private count: number;
  protected assets: Resources;

  constructor(sources: Sources) {
    this.set(sources);
  }

  private async load(): Promise<void> {
    try {
      const names = Object.keys(this.sources);

      if (isEmpty(names)) {
        throw Error('There is nothing to load');
      }

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

  public set(sources: Sources): void {
    this.sources = sources;
    this.assets = {};
    this.count = Object.keys(sources).length;
  }

  public clear(): void {
    this.sources = {};
    this.assets = {};
    this.count = 0;
  }
}
