import { Logger } from '../Logger';
import { Observable } from '../Observable';
import { isEmpty } from '../utils';

type Sources = Record<string, unknown>;
type Resources = Record<string, unknown>;

export abstract class Assets extends Observable {
  async load(sources: Sources) {
    const assets = {} as Resources;

    try {
      const names = Object.keys(sources);

      if (isEmpty(names)) {
        throw Error('There is nothing to load');
      }

      await Promise.all(
        names.map(async (key) => {
          const source = sources[key];
          const asset = await this.loadAsset(source);

          assets[key] = asset;

          this.notify();
        })
      );
    } catch (error) {
      Logger.error(error);
    }

    return assets;
  }

  protected abstract loadAsset(source: unknown): Promise<unknown>;
}
