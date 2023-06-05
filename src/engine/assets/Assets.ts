import { Logger } from '../debug/Logger';
import { isEmpty } from '@/helpers/utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets {
  private readonly sources;
  private readonly count;
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

  protected async retrieve(): Promise<unknown> {
    const keys = Object.keys(this.assets);

    if (isEmpty(keys)) {
      await this.load();
    }

    return this.assets;
  }

  protected abstract loadAsset(src: unknown): Promise<unknown>;

  public clear(): void {
    this.assets = {};
  }
}
