import { Logger } from '../Logger';
import { isEmpty } from '../utils';

type Sources = Record<string, unknown>;
type Resources = Sources;

export abstract class Assets {
  private sources: Sources;
  private count: number;

  constructor(sources: Sources) {
    this.set(sources);
  }

  protected abstract loadAsset(src: unknown): Promise<unknown>;

  public async load(): Promise<Resources> {
    const assets = {} as Resources;

    try {
      const names = Object.keys(this.sources);

      if (isEmpty(names)) {
        throw Error('There is nothing to load');
      }

      await Promise.all(
        names.map(async (key) => {
          const source = this.sources[key];
          const asset = await this.loadAsset(source);

          assets[key] = asset;
        })
      );
    } catch (error) {
      Logger.error(error);
    }

    return assets;
  }

  public set(sources: Sources): void {
    this.sources = sources;
    this.count = Object.keys(sources).length;
  }
}
